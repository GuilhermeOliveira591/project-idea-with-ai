import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { ChannelsService } from '../channels/channels.service';
import {
  AlreadySubscribedException,
  CannotSubscribeToOwnChannelException,
  ChannelNotFoundException,
} from '../common/exceptions/domain.exception';
import { Subscription } from './entities/subscription.entity';

const PG_UNIQUE_VIOLATION = '23505';

function isPgUniqueViolation(err: unknown): boolean {
  return (
    err instanceof QueryFailedError &&
    (err as { code?: string }).code === PG_UNIQUE_VIOLATION
  );
}

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly channelsService: ChannelsService,
  ) {}

  async subscribe(userId: string, channelId: string): Promise<Subscription> {
    const channel = await this.channelsService.findById(channelId);
    if (!channel) {
      throw new ChannelNotFoundException();
    }
    if (channel.user_id === userId) {
      throw new CannotSubscribeToOwnChannelException();
    }

    const existing = await this.subscriptionRepository.findOne({
      where: { user_id: userId, channel_id: channelId },
    });
    if (existing) {
      throw new AlreadySubscribedException();
    }

    try {
      return await this.subscriptionRepository.save(
        this.subscriptionRepository.create({
          user_id: userId,
          channel_id: channelId,
        }),
      );
    } catch (err) {
      // Concurrent insert between the pre-check and the save — the unique
      // index on (user_id, channel_id) is the source of truth.
      if (isPgUniqueViolation(err)) {
        throw new AlreadySubscribedException();
      }
      throw err;
    }
  }

  async unsubscribe(userId: string, channelId: string): Promise<void> {
    const channel = await this.channelsService.findById(channelId);
    if (!channel) {
      throw new ChannelNotFoundException();
    }
    // Idempotent: deleting an absent subscription is a no-op, not an error.
    await this.subscriptionRepository.delete({
      user_id: userId,
      channel_id: channelId,
    });
  }
}
