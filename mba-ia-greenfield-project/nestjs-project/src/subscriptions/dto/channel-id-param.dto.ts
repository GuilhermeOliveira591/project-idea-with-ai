import { IsUUID } from 'class-validator';

export class ChannelIdParamDto {
  @IsUUID('4')
  channelId: string;
}
