import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ThrottlerStorage, ThrottlerStorageService } from '@nestjs/throttler';
import request from 'supertest';
import { App } from 'supertest/types';
import { DataSource, Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import { Channel } from '../src/channels/entities/channel.entity';
import { DomainExceptionFilter } from '../src/common/filters/domain-exception.filter';
import { ValidationExceptionFilter } from '../src/common/filters/validation-exception.filter';
import { cleanAllTables } from '../src/test/create-test-data-source';
import { User } from '../src/users/entities/user.entity';

const MISSING_UUID = '00000000-0000-4000-8000-000000000000';

describe('Subscriptions (e2e)', () => {
  let app: INestApplication<App>;
  let dataSource: DataSource;
  let userRepository: Repository<User>;
  let channelRepository: Repository<Channel>;
  let throttlerStorage: ThrottlerStorageService;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(
      new DomainExceptionFilter(),
      new ValidationExceptionFilter(),
    );
    await app.init();

    dataSource = moduleFixture.get(DataSource);
    userRepository = dataSource.getRepository(User);
    channelRepository = dataSource.getRepository(Channel);
    throttlerStorage =
      moduleFixture.get<ThrottlerStorageService>(ThrottlerStorage);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await dataSource.query('DELETE FROM "subscriptions"');
    await cleanAllTables(dataSource);
    throttlerStorage.storage.clear();
  });

  async function captureConfirmationToken(
    email: string,
    password = 'password123',
  ): Promise<string> {
    const authService = app.get(AuthService);
    const mailServiceInstance = (authService as any).mailService;
    let capturedToken = '';
    jest
      .spyOn(mailServiceInstance, 'sendConfirmationEmail')
      .mockImplementationOnce(async (_e: string, _n: string, t: string) => {
        capturedToken = t;
      });
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email, password });
    return capturedToken;
  }

  async function registerConfirmAndLogin(
    email: string,
    password = 'password123',
  ): Promise<string> {
    const token = await captureConfirmationToken(email, password);
    await request(app.getHttpServer()).get('/auth/confirm-email').query({
      token,
    });
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password });
    return res.body.access_token as string;
  }

  async function channelIdOf(email: string): Promise<string> {
    const user = await userRepository.findOne({ where: { email } });
    const channel = await channelRepository.findOneBy({ user_id: user!.id });
    return channel!.id;
  }

  describe('POST /channels/:channelId/subscription', () => {
    it('returns 401 without an access token', async () => {
      await request(app.getHttpServer())
        .post(`/channels/${MISSING_UUID}/subscription`)
        .expect(401);
    });

    it('returns 201 then 409 ALREADY_SUBSCRIBED on a repeat', async () => {
      const followerToken = await registerConfirmAndLogin('a@example.com');
      await registerConfirmAndLogin('owner@example.com');
      const channelId = await channelIdOf('owner@example.com');

      const created = await request(app.getHttpServer())
        .post(`/channels/${channelId}/subscription`)
        .set('Authorization', `Bearer ${followerToken}`)
        .expect(201);
      expect(created.body.id).toBeDefined();
      expect(created.body.channel_id).toBe(channelId);

      const duplicate = await request(app.getHttpServer())
        .post(`/channels/${channelId}/subscription`)
        .set('Authorization', `Bearer ${followerToken}`)
        .expect(409);
      expect(duplicate.body.error).toBe('ALREADY_SUBSCRIBED');
    });

    it('returns 409 CANNOT_SUBSCRIBE_TO_OWN_CHANNEL on own channel', async () => {
      const token = await registerConfirmAndLogin('self@example.com');
      const channelId = await channelIdOf('self@example.com');

      const res = await request(app.getHttpServer())
        .post(`/channels/${channelId}/subscription`)
        .set('Authorization', `Bearer ${token}`)
        .expect(409);
      expect(res.body.error).toBe('CANNOT_SUBSCRIBE_TO_OWN_CHANNEL');
    });

    it('returns 404 CHANNEL_NOT_FOUND for a non-existent channel', async () => {
      const token = await registerConfirmAndLogin('a@example.com');

      const res = await request(app.getHttpServer())
        .post(`/channels/${MISSING_UUID}/subscription`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
      expect(res.body.error).toBe('CHANNEL_NOT_FOUND');
    });

    it('returns 400 VALIDATION_ERROR for a non-UUID channelId', async () => {
      const token = await registerConfirmAndLogin('a@example.com');

      const res = await request(app.getHttpServer())
        .post('/channels/not-a-uuid/subscription')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);
      expect(res.body.error).toBe('VALIDATION_ERROR');
    });
  });

  describe('DELETE /channels/:channelId/subscription', () => {
    it('returns 204 and is idempotent on a repeat', async () => {
      const followerToken = await registerConfirmAndLogin('a@example.com');
      await registerConfirmAndLogin('owner@example.com');
      const channelId = await channelIdOf('owner@example.com');

      await request(app.getHttpServer())
        .post(`/channels/${channelId}/subscription`)
        .set('Authorization', `Bearer ${followerToken}`)
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/channels/${channelId}/subscription`)
        .set('Authorization', `Bearer ${followerToken}`)
        .expect(204);

      // Idempotent: second unsubscribe still 204.
      await request(app.getHttpServer())
        .delete(`/channels/${channelId}/subscription`)
        .set('Authorization', `Bearer ${followerToken}`)
        .expect(204);
    });

    it('returns 404 CHANNEL_NOT_FOUND for a non-existent channel', async () => {
      const token = await registerConfirmAndLogin('a@example.com');

      const res = await request(app.getHttpServer())
        .delete(`/channels/${MISSING_UUID}/subscription`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
      expect(res.body.error).toBe('CHANNEL_NOT_FOUND');
    });
  });

  describe('GET /me/subscriptions', () => {
    it('returns 401 without an access token', async () => {
      await request(app.getHttpServer()).get('/me/subscriptions').expect(401);
    });

    it('returns the followed channels with embedded subscriber_count', async () => {
      const followerToken = await registerConfirmAndLogin('a@example.com');
      await registerConfirmAndLogin('owner@example.com');
      const channelId = await channelIdOf('owner@example.com');

      await request(app.getHttpServer())
        .post(`/channels/${channelId}/subscription`)
        .set('Authorization', `Bearer ${followerToken}`)
        .expect(201);

      const res = await request(app.getHttpServer())
        .get('/me/subscriptions')
        .set('Authorization', `Bearer ${followerToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].channel.id).toBe(channelId);
      expect(res.body[0].channel.subscriber_count).toBe(1);
      expect(res.body[0].subscribed_at).toBeDefined();
    });
  });

  describe('GET /channels/:channelId/subscribers/count', () => {
    it('returns 200 with the subscriber count', async () => {
      const followerToken = await registerConfirmAndLogin('a@example.com');
      await registerConfirmAndLogin('owner@example.com');
      const channelId = await channelIdOf('owner@example.com');

      await request(app.getHttpServer())
        .post(`/channels/${channelId}/subscription`)
        .set('Authorization', `Bearer ${followerToken}`)
        .expect(201);

      const res = await request(app.getHttpServer())
        .get(`/channels/${channelId}/subscribers/count`)
        .set('Authorization', `Bearer ${followerToken}`)
        .expect(200);

      expect(res.body).toEqual({
        channel_id: channelId,
        subscriber_count: 1,
      });
    });

    it('returns 404 CHANNEL_NOT_FOUND for a non-existent channel', async () => {
      const token = await registerConfirmAndLogin('a@example.com');

      const res = await request(app.getHttpServer())
        .get(`/channels/${MISSING_UUID}/subscribers/count`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404);
      expect(res.body.error).toBe('CHANNEL_NOT_FOUND');
    });
  });
});
