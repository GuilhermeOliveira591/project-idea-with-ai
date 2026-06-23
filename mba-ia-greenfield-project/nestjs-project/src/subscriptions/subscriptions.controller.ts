import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import type { JwtPayload } from '../auth/auth.types';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ChannelIdParamDto } from './dto/channel-id-param.dto';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionsService } from './subscriptions.service';
import type {
  SubscriberCount,
  SubscriptionListItem,
} from './subscriptions.types';

@Controller()
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('channels/:channelId/subscription')
  async subscribe(
    @CurrentUser() user: JwtPayload,
    @Param() params: ChannelIdParamDto,
  ): Promise<Subscription> {
    return this.subscriptionsService.subscribe(user.sub, params.channelId);
  }

  @Delete('channels/:channelId/subscription')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unsubscribe(
    @CurrentUser() user: JwtPayload,
    @Param() params: ChannelIdParamDto,
  ): Promise<void> {
    return this.subscriptionsService.unsubscribe(user.sub, params.channelId);
  }

  @Get('me/subscriptions')
  async listMySubscriptions(
    @CurrentUser() user: JwtPayload,
  ): Promise<SubscriptionListItem[]> {
    return this.subscriptionsService.listSubscriptions(user.sub);
  }

  @Get('channels/:channelId/subscribers/count')
  async countSubscribers(
    @Param() params: ChannelIdParamDto,
  ): Promise<SubscriberCount> {
    return this.subscriptionsService.countSubscribers(params.channelId);
  }
}
