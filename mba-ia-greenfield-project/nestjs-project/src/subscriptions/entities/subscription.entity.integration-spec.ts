import { DataSource, Repository } from 'typeorm';
import { RefreshToken } from '../../auth/entities/refresh-token.entity';
import { VerificationToken } from '../../auth/entities/verification-token.entity';
import { Channel } from '../../channels/entities/channel.entity';
import {
  cleanAllTables,
  createTestDataSource,
} from '../../test/create-test-data-source';
import { User } from '../../users/entities/user.entity';
import { Subscription } from './subscription.entity';

const ALL_ENTITIES = [
  User,
  Channel,
  RefreshToken,
  VerificationToken,
  Subscription,
];

const MISSING_UUID = '00000000-0000-4000-8000-000000000000';

describe('Subscription entity (integration)', () => {
  let dataSource: DataSource;
  let userRepository: Repository<User>;
  let channelRepository: Repository<Channel>;
  let subscriptionRepository: Repository<Subscription>;

  beforeAll(async () => {
    dataSource = createTestDataSource(ALL_ENTITIES);
    await dataSource.initialize();
    userRepository = dataSource.getRepository(User);
    channelRepository = dataSource.getRepository(Channel);
    subscriptionRepository = dataSource.getRepository(Subscription);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  beforeEach(async () => {
    await dataSource.query('DELETE FROM "subscriptions"');
    await cleanAllTables(dataSource);
  });

  let counter = 0;
  async function newUser(): Promise<User> {
    counter++;
    return userRepository.save(
      userRepository.create({
        email: `sub_ent_${counter}@example.com`,
        password: 'hashed',
      }),
    );
  }
  async function newChannel(ownerId: string): Promise<Channel> {
    counter++;
    return channelRepository.save(
      channelRepository.create({
        name: `ch_${counter}`,
        nickname: `ch_${counter}`,
        user_id: ownerId,
      }),
    );
  }

  it('persists a subscription with auto-generated id and created_at', async () => {
    const owner = await newUser();
    const channel = await newChannel(owner.id);
    const follower = await newUser();

    const saved = await subscriptionRepository.save(
      subscriptionRepository.create({
        user_id: follower.id,
        channel_id: channel.id,
      }),
    );

    expect(saved.id).toBeDefined();
    expect(saved.created_at).toBeInstanceOf(Date);
  });

  it('enforces the unique (user_id, channel_id) constraint', async () => {
    const owner = await newUser();
    const channel = await newChannel(owner.id);
    const follower = await newUser();

    await subscriptionRepository.save(
      subscriptionRepository.create({
        user_id: follower.id,
        channel_id: channel.id,
      }),
    );

    await expect(
      subscriptionRepository.save(
        subscriptionRepository.create({
          user_id: follower.id,
          channel_id: channel.id,
        }),
      ),
    ).rejects.toThrow();
  });

  it('allows two different users to follow the same channel', async () => {
    const owner = await newUser();
    const channel = await newChannel(owner.id);
    const follower1 = await newUser();
    const follower2 = await newUser();

    await subscriptionRepository.save(
      subscriptionRepository.create({
        user_id: follower1.id,
        channel_id: channel.id,
      }),
    );
    await subscriptionRepository.save(
      subscriptionRepository.create({
        user_id: follower2.id,
        channel_id: channel.id,
      }),
    );

    const all = await subscriptionRepository.find();
    expect(all).toHaveLength(2);
  });

  it('rejects a subscription referencing a non-existent channel (FK)', async () => {
    const follower = await newUser();

    await expect(
      subscriptionRepository.save(
        subscriptionRepository.create({
          user_id: follower.id,
          channel_id: MISSING_UUID,
        }),
      ),
    ).rejects.toThrow();
  });

  it('rejects a subscription referencing a non-existent user (FK)', async () => {
    const owner = await newUser();
    const channel = await newChannel(owner.id);

    await expect(
      subscriptionRepository.save(
        subscriptionRepository.create({
          user_id: MISSING_UUID,
          channel_id: channel.id,
        }),
      ),
    ).rejects.toThrow();
  });
});
