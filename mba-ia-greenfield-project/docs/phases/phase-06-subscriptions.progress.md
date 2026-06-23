# Phase 06 — Inscrição em Canais — Progress

**Status:** in_progress
**SIs:** 4/5 completed

### SI-06.1 — Subscription Entity and Migration
- **Status:** completed
- **Tests:** `subscription.entity.integration-spec.ts` — 5 passed (unique constraint, FK to users/channels, created_at default, two users same channel)
- **Observations:** Migration `1782247364948-CreateSubscriptions` generated via TypeORM CLI; applies cleanly on the migrated DB. Existing `migrations.integration-spec.ts` is unaffected (it registers migration classes explicitly, not via glob).

### SI-06.2 — Domain Exceptions and Channel Lookup
- **Status:** completed
- **Tests:** `domain-exception.filter.spec.ts` (+3 cases: CHANNEL_NOT_FOUND 404, ALREADY_SUBSCRIBED 409, CANNOT_SUBSCRIBE_TO_OWN_CHANNEL 409) and `channels.service.integration-spec.ts` (+2 cases for findById) — 14 passed.
- **Observations:** `findById` uses `dataSource.getRepository(Channel)` to avoid changing the `ChannelsService` constructor (would ripple into existing specs).

### SI-06.3 — SubscriptionsService: Subscribe and Unsubscribe
- **Status:** completed
- **Tests:** `subscriptions.service.spec.ts` (unit: subscribe 404/own/dup/happy, unsubscribe 404/idempotent) and `subscriptions.service.integration-spec.ts` (subscribe + unsubscribe over real Postgres) — 12 passed.
- **Observations:** Unique-violation race fallback re-thrown as `AlreadySubscribedException`. Unsubscribe deletes idempotently after a 404 channel check.

### SI-06.4 — SubscriptionsService: List and Subscriber Count
- **Status:** completed
- **Tests:** unit `countSubscribers` (404 + count) and integration `listSubscriptions` (empty, join + embedded subscriber_count, newest-first) and `countSubscribers` — full service suite 18 passed.
- **Observations:** Listing uses one `find` with `relations: ['channel']` + one grouped `COUNT ... GROUP BY` — constant queries regardless of N (no N+1).

### SI-06.5 — Controller, DTO, Module, E2E
- **Status:** pending
- **Tests:** —
- **Observations:** —
