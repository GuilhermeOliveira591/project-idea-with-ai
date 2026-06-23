export interface SubscribedChannel {
  id: string;
  name: string;
  nickname: string;
  description: string | null;
  subscriber_count: number;
}

export interface SubscriptionListItem {
  subscribed_at: Date;
  channel: SubscribedChannel;
}

export interface SubscriberCount {
  channel_id: string;
  subscriber_count: number;
}
