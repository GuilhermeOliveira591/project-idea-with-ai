import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChannelsService } from '../channels/channels.service';
import { Channel } from '../channels/entities/channel.entity';
import {
  AlreadySubscribedException,
  CannotSubscribeToOwnChannelException,
  ChannelNotFoundException,
} from '../common/exceptions/domain.exception';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionsService } from './subscriptions.service';

function makeChannel(ownerId: string): Channel {
  const channel = new Channel();
  channel.id = 'channel-id';
  channel.user_id = ownerId;
  channel.name = 'name';
  channel.nickname = 'nick';
  channel.description = null;
  channel.created_at = new Date();
  channel.updated_at = new Date();
  return channel;
}

describe('SubscriptionsService (unit)', () => {
  let service: SubscriptionsService;
  let repo: {
    findOne: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    delete: jest.Mock;
    count: jest.Mock;
  };
  let channelsService: { findById: jest.Mock };

  beforeEach(async () => {
    repo = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    };
    channelsService = { findById: jest.fn() };

    const moduleRef = await Test.createTestingModule({
      providers: [
        SubscriptionsService,
        { provide: getRepositoryToken(Subscription), useValue: repo },
        { provide: ChannelsService, useValue: channelsService },
      ],
    }).compile();

    service = moduleRef.get(SubscriptionsService);
  });

  describe('subscribe', () => {
    it('throws ChannelNotFoundException when the channel does not exist', async () => {
      channelsService.findById.mockResolvedValue(null);

      await expect(
        service.subscribe('user-1', 'channel-id'),
      ).rejects.toBeInstanceOf(ChannelNotFoundException);
      expect(repo.save).not.toHaveBeenCalled();
    });

    it('throws CannotSubscribeToOwnChannelException when subscribing to own channel', async () => {
      channelsService.findById.mockResolvedValue(makeChannel('user-1'));

      await expect(
        service.subscribe('user-1', 'channel-id'),
      ).rejects.toBeInstanceOf(CannotSubscribeToOwnChannelException);
      expect(repo.save).not.toHaveBeenCalled();
    });

    it('throws AlreadySubscribedException when a subscription already exists', async () => {
      channelsService.findById.mockResolvedValue(makeChannel('owner'));
      repo.findOne.mockResolvedValue({ id: 'sub-1' });

      await expect(
        service.subscribe('user-1', 'channel-id'),
      ).rejects.toBeInstanceOf(AlreadySubscribedException);
      expect(repo.save).not.toHaveBeenCalled();
    });

    it('creates and saves a subscription on the happy path', async () => {
      channelsService.findById.mockResolvedValue(makeChannel('owner'));
      repo.findOne.mockResolvedValue(null);
      const created = { user_id: 'user-1', channel_id: 'channel-id' };
      repo.create.mockReturnValue(created);
      repo.save.mockResolvedValue({ id: 'sub-1', ...created });

      const result = await service.subscribe('user-1', 'channel-id');

      expect(repo.create).toHaveBeenCalledWith({
        user_id: 'user-1',
        channel_id: 'channel-id',
      });
      expect(repo.save).toHaveBeenCalledWith(created);
      expect(result).toEqual({ id: 'sub-1', ...created });
    });
  });

  describe('unsubscribe', () => {
    it('throws ChannelNotFoundException when the channel does not exist', async () => {
      channelsService.findById.mockResolvedValue(null);

      await expect(
        service.unsubscribe('user-1', 'channel-id'),
      ).rejects.toBeInstanceOf(ChannelNotFoundException);
      expect(repo.delete).not.toHaveBeenCalled();
    });

    it('deletes the subscription and resolves even when no row matches', async () => {
      channelsService.findById.mockResolvedValue(makeChannel('owner'));
      repo.delete.mockResolvedValue({ affected: 0 });

      await expect(
        service.unsubscribe('user-1', 'channel-id'),
      ).resolves.toBeUndefined();
      expect(repo.delete).toHaveBeenCalledWith({
        user_id: 'user-1',
        channel_id: 'channel-id',
      });
    });
  });

  describe('countSubscribers', () => {
    it('throws ChannelNotFoundException when the channel does not exist', async () => {
      channelsService.findById.mockResolvedValue(null);

      await expect(
        service.countSubscribers('channel-id'),
      ).rejects.toBeInstanceOf(ChannelNotFoundException);
    });

    it('returns the subscriber count for an existing channel', async () => {
      channelsService.findById.mockResolvedValue(makeChannel('owner'));
      repo.count.mockResolvedValue(3);

      const result = await service.countSubscribers('channel-id');

      expect(result).toEqual({ channel_id: 'channel-id', subscriber_count: 3 });
    });
  });
});
