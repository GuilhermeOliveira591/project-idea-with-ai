import { DataSource, Repository } from 'typeorm';
import { RefreshToken } from '../auth/entities/refresh-token.entity';
import { VerificationToken } from '../auth/entities/verification-token.entity';
import { ChannelsService } from '../channels/channels.service';
import { Channel } from '../channels/entities/channel.entity';
import {
  AlreadySubscribedException,
  CannotSubscribeToOwnChannelException,
  ChannelNotFoundException,
} from '../common/exceptions/domain.exception';
import {
  cleanAllTables,
  createTestDataSource,
} from '../test/create-test-data-source';
import { User } from '../users/entities/user.entity';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionsService } from './subscriptions.service';

const ALL_ENTITIES = [
  User,
  Channel,
  RefreshToken,
  VerificationToken,
  Subscription,
];

const MISSING_UUID = '00000000-0000-4000-8000-000000000000';

describe('SubscriptionsService (integration)', () => {
  let dataSource: DataSource;
  let service: SubscriptionsService;
  let userRepository: Repository<User>;
  let channelRepository: Repository<Channel>;
  let subscriptionRepository: Repository<Subscription>;

  beforeAll(async () => {
    dataSource = createTestDataSource(ALL_ENTITIES);
    await dataSource.initialize();
    userRepository = dataSource.getRepository(User);
    channelRepository = dataSource.getRepository(Channel);
    subscriptionRepository = dataSource.getRepository(Subscription);
    service = new SubscriptionsService(
      subscriptionRepository,
      new ChannelsService(dataSource),
    );
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  beforeEach(async () => {
    await dataSource.query('DELETE FROM "subscriptions"');
    await cleanAllTables(dataSource);
  });

  let n = 0;
  async function newUser(): Promise<User> {
    n++;
    return userRepository.save(
      userRepository.create({
        email: `sub_svc_${n}@example.com`,
        password: 'hashed',
      }),
    );
  }
  async function newChannel(ownerId: string): Promise<Channel> {
    n++;
    return channelRepository.save(
      channelRepository.create({
        name: `ch_${n}`,
        nickname: `ch_${n}`,
        user_id: ownerId,
      }),
    );
  }

  describe('subscribe', () => {
    it('persists exactly one subscription on the happy path', async () => {
      const owner = await newUser();
      const channel = await newChannel(owner.id);
      const follower = await newUser();

      const sub = await service.subscribe(follower.id, channel.id);

      expect(sub.id).toBeDefined();
      const rows = await subscriptionRepository.find();
      expect(rows).toHaveLength(1);
      expect(rows[0].user_id).toBe(follower.id);
      expect(rows[0].channel_id).toBe(channel.id);
    });

    it('rejects a duplicate subscription with AlreadySubscribedException', async () => {
      const owner = await newUser();
      const channel = await newChannel(owner.id);
      const follower = await newUser();

      await service.subscribe(follower.id, channel.id);
      await expect(
        service.subscribe(follower.id, channel.id),
      ).rejects.toBeInstanceOf(AlreadySubscribedException);

      expect(await subscriptionRepository.find()).toHaveLength(1);
    });

    it('rejects self-subscription with CannotSubscribeToOwnChannelException', async () => {
      const owner = await newUser();
      const channel = await newChannel(owner.id);

      await expect(
        service.subscribe(owner.id, channel.id),
      ).rejects.toBeInstanceOf(CannotSubscribeToOwnChannelException);
    });

    it('rejects a non-existent channel with ChannelNotFoundException', async () => {
      const follower = await newUser();

      await expect(
        service.subscribe(follower.id, MISSING_UUID),
      ).rejects.toBeInstanceOf(ChannelNotFoundException);
    });
  });

  describe('unsubscribe', () => {
    it('removes the subscription and is idempotent on a second call', async () => {
      const owner = await newUser();
      const channel = await newChannel(owner.id);
      const follower = await newUser();
      await service.subscribe(follower.id, channel.id);

      await service.unsubscribe(follower.id, channel.id);
      expect(await subscriptionRepository.find()).toHaveLength(0);

      await expect(
        service.unsubscribe(follower.id, channel.id),
      ).resolves.toBeUndefined();
    });

    it('rejects a non-existent channel with ChannelNotFoundException', async () => {
      const follower = await newUser();

      await expect(
        service.unsubscribe(follower.id, MISSING_UUID),
      ).rejects.toBeInstanceOf(ChannelNotFoundException);
    });
  });
});
