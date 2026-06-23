# Phase 06 — Inscrição em Canais (Channel Subscriptions)

## Objective

Deliver the channel-subscription slice of Phase 06 — authenticated users follow and unfollow channels, list the channels they follow without N+1, and read a channel's subscriber count — built entirely on the Phase 02 `User`/`Channel` foundation, mirroring the `auth/` module's layered structure.

---

## Step Implementations

### SI-06.1 — Subscription Entity and Migration

**Description:** Create the `Subscription` join entity linking a user to a channel they follow, with a unique constraint on `(user_id, channel_id)`, and generate the migration creating the `subscriptions` table.

**Technical actions:**

- Create `src/subscriptions/entities/subscription.entity.ts` — `@Entity('subscriptions')` with columns: `id` (uuid PK generated), `user_id` (uuid, FK → users), `channel_id` (uuid, FK → channels), `created_at` (`@CreateDateColumn`). Define `@ManyToOne(() => User)` with `@JoinColumn({ name: 'user_id' })` and `@ManyToOne(() => Channel)` with `@JoinColumn({ name: 'channel_id' })`. Add a composite `@Index(['user_id', 'channel_id'], { unique: true })` and single-column `@Index` on `user_id` and on `channel_id` (per TD-01, TD-08)
- Generate the migration via `npm run migration:generate -- src/database/migrations/CreateSubscriptions` and review the generated SQL: confirm the `subscriptions` table, the unique index on `(user_id, channel_id)`, the secondary indexes on `user_id` and `channel_id`, and both FK constraints to `users(id)` and `channels(id)`
- Verify the migration `down()` drops the FKs, indexes, and table in reverse order, consistent with the existing `CreateAuthTokens` migration style

**Tests:**

| File | Layer | Verifies |
|------|-------|----------|
| `src/subscriptions/entities/subscription.entity.integration-spec.ts` | Integration | Unique `(user_id, channel_id)` constraint rejects duplicates; FK to users and channels enforced; `created_at` auto-populated; two different users may follow the same channel |

**Dependencies:** None

**Acceptance criteria:**

- `npm run migration:run` creates the `subscriptions` table with all columns, the unique index on `(user_id, channel_id)`, and indexes on `user_id` and `channel_id`
- Inserting two subscription rows with the same `(user_id, channel_id)` fails with a unique constraint violation
- Inserting a subscription referencing a non-existent `user_id` or `channel_id` fails with a foreign-key violation
- A newly created subscription has `created_at` auto-populated

---

### SI-06.2 — Domain Exceptions and Channel Lookup

**Description:** Add the three Phase 06 domain exceptions to the shared catalog and a read method on `ChannelsService` so the subscriptions feature can resolve a channel (for the 404 and self-subscription checks) without owning the `Channel` entity.

**Technical actions:**

- Add to `src/common/exceptions/domain.exception.ts` three concrete `DomainException` subclasses: `ChannelNotFoundException` (`CHANNEL_NOT_FOUND`, 404), `AlreadySubscribedException` (`ALREADY_SUBSCRIBED`, 409), `CannotSubscribeToOwnChannelException` (`CANNOT_SUBSCRIBE_TO_OWN_CHANNEL`, 409). The existing global `DomainExceptionFilter` maps them automatically — no filter change is needed (per TD-02, TD-04, TD-05)
- Add `findById(channelId: string): Promise<Channel | null>` to `src/channels/channels.service.ts` — resolve the repository from the already-injected `DataSource` via `this.dataSource.getRepository(Channel).findOne({ where: { id: channelId } })`, avoiding a constructor-signature change that would ripple into existing `ChannelsService` tests. This keeps the `Channel` read inside `ChannelsModule`, which already exports `ChannelsService`
- Add the three new exception cases to `src/common/filters/domain-exception.filter.spec.ts` so each maps to the correct `{ statusCode, error, message }` shape

**Tests:**

| File | Layer | Verifies |
|------|-------|----------|
| `src/common/filters/domain-exception.filter.spec.ts` | Unit | `ChannelNotFoundException` → 404 `CHANNEL_NOT_FOUND`; `AlreadySubscribedException` → 409 `ALREADY_SUBSCRIBED`; `CannotSubscribeToOwnChannelException` → 409 `CANNOT_SUBSCRIBE_TO_OWN_CHANNEL` |
| `src/channels/channels.service.integration-spec.ts` | Integration | `findById` returns the channel when it exists and `null` when it does not |

**Dependencies:** None

**Acceptance criteria:**

- A service throwing `ChannelNotFoundException` produces `{ statusCode: 404, error: 'CHANNEL_NOT_FOUND', message: ... }` in the HTTP response
- A service throwing `AlreadySubscribedException` produces `{ statusCode: 409, error: 'ALREADY_SUBSCRIBED', message: ... }`
- A service throwing `CannotSubscribeToOwnChannelException` produces `{ statusCode: 409, error: 'CANNOT_SUBSCRIBE_TO_OWN_CHANNEL', message: ... }`
- `ChannelsService.findById` returns the matching channel or `null` without throwing

---

### SI-06.3 — SubscriptionsService: Subscribe and Unsubscribe

**Description:** Implement the core follow/unfollow business logic in `SubscriptionsService`, enforcing channel existence (404), self-subscription prevention (409), duplicate-subscription conflict (409), and idempotent unsubscribe (204).

**Technical actions:**

- Create `src/subscriptions/subscriptions.service.ts` — `SubscriptionsService` injecting `@InjectRepository(Subscription) private readonly subscriptionRepository: Repository<Subscription>` and `private readonly channelsService: ChannelsService`
- Implement `subscribe(userId: string, channelId: string): Promise<Subscription>` — (1) load the channel via `channelsService.findById(channelId)`; if `null`, throw `ChannelNotFoundException`; (2) if `channel.user_id === userId`, throw `CannotSubscribeToOwnChannelException`; (3) if a subscription already exists for `(userId, channelId)`, throw `AlreadySubscribedException`; (4) create and save the subscription. Catch a PostgreSQL unique violation (`code '23505'` on the `(user_id, channel_id)` index) from a concurrent insert and re-throw it as `AlreadySubscribedException` (per TD-02, TD-04, TD-05)
- Implement `unsubscribe(userId: string, channelId: string): Promise<void>` — (1) load the channel via `channelsService.findById(channelId)`; if `null`, throw `ChannelNotFoundException`; (2) `delete` the subscription matching `(user_id, channel_id)`. The delete is idempotent — when no row matches, the method still resolves with no error (per TD-03, TD-05)

**Tests:**

| File | Layer | Verifies |
|------|-------|----------|
| `src/subscriptions/subscriptions.service.spec.ts` | Unit | Subscribe: throws on missing channel, throws on own channel, throws on existing subscription, saves on happy path (mock repository + `ChannelsService`); Unsubscribe: throws on missing channel, calls delete and resolves when no row matches |
| `src/subscriptions/subscriptions.service.integration-spec.ts` | Integration | Subscribe persists one row; duplicate `(user_id, channel_id)` surfaces as `AlreadySubscribedException`; self-subscription rejected; unsubscribe removes the row and is idempotent on a second call — all against the real Postgres from `compose.yaml` |

**Dependencies:** SI-06.1, SI-06.2

**Acceptance criteria:**

- Subscribing to an existing channel the user does not own and does not yet follow persists exactly one `subscriptions` row for `(user_id, channel_id)`
- Subscribing to a channel the user already follows raises `AlreadySubscribedException` and does not create a second row
- Subscribing to one's own channel raises `CannotSubscribeToOwnChannelException`
- Subscribing to a non-existent channel raises `ChannelNotFoundException`
- Unsubscribing from a followed channel removes the row; unsubscribing again resolves without error and leaves no row
- Unsubscribing from a non-existent channel raises `ChannelNotFoundException`

---

### SI-06.4 — SubscriptionsService: List Followed Channels and Subscriber Count

**Description:** Implement the read side — listing the channels a user follows in a single join query (no N+1) with each channel's subscriber count embedded, and a standalone subscriber-count lookup for a channel.

**Technical actions:**

- Implement `listSubscriptions(userId: string): Promise<SubscriptionListItem[]>` in `SubscriptionsService` — load all of the user's subscriptions joining the `channels` table in one query (`relations: ['channel']` or a `leftJoinAndSelect`), ordered by `created_at DESC`. Compute each followed channel's subscriber count with one grouped aggregate (`SELECT channel_id, COUNT(*) ... WHERE channel_id IN (:...ids) GROUP BY channel_id`), then map to the response shape — total queries stay constant regardless of how many channels are followed (per TD-08)
- Implement `countSubscribers(channelId: string): Promise<{ channel_id: string; subscriber_count: number }>` in `SubscriptionsService` — load the channel via `channelsService.findById(channelId)`; if `null`, throw `ChannelNotFoundException`; otherwise return `channel_id` and the `COUNT(*)` of subscriptions for that channel (per TD-05, TD-07)
- Define the response shape `SubscriptionListItem` (e.g., in `src/subscriptions/subscriptions.types.ts`) — `{ subscribed_at, channel: { id, name, nickname, description, subscriber_count } }` — so the listing carries each followed channel's identity plus its live subscriber count

**Tests:**

| File | Layer | Verifies |
|------|-------|----------|
| `src/subscriptions/subscriptions.service.spec.ts` | Unit | `countSubscribers` throws `ChannelNotFoundException` on missing channel; returns the count otherwise (mock repository + `ChannelsService`) |
| `src/subscriptions/subscriptions.service.integration-spec.ts` | Integration | `listSubscriptions` returns followed channels joined in a single query with correct `subscriber_count`, ordered by recency; `countSubscribers` returns the live count; listing a user with no subscriptions returns an empty array |

**Dependencies:** SI-06.3

**Acceptance criteria:**

- `listSubscriptions` returns one item per followed channel, each embedding the channel's `id`, `name`, `nickname`, `description`, and `subscriber_count`, ordered most-recently-followed first
- Listing the subscriptions of a user who follows N channels issues a constant number of queries (no per-channel query) regardless of N
- A user with no subscriptions gets an empty array
- `countSubscribers` returns `{ channel_id, subscriber_count }` reflecting the current number of subscribers
- `countSubscribers` on a non-existent channel raises `ChannelNotFoundException`

---

### SI-06.5 — Controller, DTO, Module Wiring, and E2E

**Description:** Expose the four authenticated endpoints through `SubscriptionsController`, validate the `channelId` route parameter via a DTO, wire `SubscriptionsModule`, register it in `AppModule`, and add the feature E2E suite. All endpoints inherit the global `JwtAuthGuard` (no `@Public()`), so authentication is enforced by default.

**Technical actions:**

- Create `src/subscriptions/dto/channel-id-param.dto.ts` — `ChannelIdParamDto` with `@IsUUID('4')` `channelId`, validated through `@Param()` by the global `ValidationPipe` (`transform: true`); an invalid UUID yields a 400 validation error
- Create `src/subscriptions/subscriptions.controller.ts` — `SubscriptionsController` (no controller-level prefix; full paths per method): `@Post('channels/:channelId/subscription')` returns 201 with the created subscription; `@Delete('channels/:channelId/subscription')` with `@HttpCode(204)` returns no body; `@Get('me/subscriptions')` returns 200 with the list; `@Get('channels/:channelId/subscribers/count')` returns 200 with the count. Read the authenticated user via `@CurrentUser()` and pass `user.sub` to the service
- Create `src/subscriptions/subscriptions.module.ts` — import `TypeOrmModule.forFeature([Subscription])` and `ChannelsModule`; declare `SubscriptionsController`; provide and export `SubscriptionsService`
- Register `SubscriptionsModule` in `src/app.module.ts` imports (the global `JwtAuthGuard` from `AuthModule` already protects the new routes; `autoLoadEntities: true` picks up the `Subscription` entity)
- Keep the shared `cleanAllTables` helper unchanged (touching it would force adding `Subscription` to every existing integration spec's entity list). Instead, the new integration and E2E specs clear `subscriptions` locally — `await dataSource.query('DELETE FROM "subscriptions"')` before calling `cleanAllTables(dataSource)` in `beforeEach`, respecting FK order

**Tests:**

| File | Layer | Verifies |
|------|-------|----------|
| `src/subscriptions/subscriptions.module.spec.ts` | Unit | `SubscriptionsModule` compiles with `TypeOrmModule.forFeature([Subscription])`, `ChannelsModule`, controller, and service wiring |
| `test/subscriptions.e2e-spec.ts` | E2E | All four endpoints over real Postgres: 401 without token; subscribe 201 then duplicate 409; own-channel 409; non-existent channel 404; invalid-UUID `channelId` 400; unsubscribe 204 (idempotent on repeat); list 200 with embedded `subscriber_count`; count 200 |

**Dependencies:** SI-06.3, SI-06.4

**Acceptance criteria:**

- `POST /channels/:channelId/subscription` with a valid token and a channel the user does not own returns 201 with the created subscription; a second call returns 409 `ALREADY_SUBSCRIBED`
- `POST /channels/:channelId/subscription` on the caller's own channel returns 409 `CANNOT_SUBSCRIBE_TO_OWN_CHANNEL`; on a non-existent channel returns 404 `CHANNEL_NOT_FOUND`
- `DELETE /channels/:channelId/subscription` returns 204 with no body and removes the subscription; a repeat call still returns 204 (idempotent); a non-existent channel returns 404 `CHANNEL_NOT_FOUND`
- `GET /me/subscriptions` returns 200 with the followed channels and their embedded `subscriber_count`
- `GET /channels/:channelId/subscribers/count` returns 200 with `{ channel_id, subscriber_count }`
- Any of the four endpoints without a valid access token returns 401
- Any endpoint with a non-UUID `channelId` returns 400 with a validation error

---

## Technical Specifications

### Data Model

#### Subscription

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK, generated | |
| user_id | uuid | FK → users.id, not null | The follower |
| channel_id | uuid | FK → channels.id, not null | The followed channel |
| created_at | timestamp | not null, auto-generated | `@CreateDateColumn`; doubles as "followed at" |

**Relations:** Subscription → User (many-to-one), Subscription → Channel (many-to-one)
**Indexes:** `(user_id, channel_id)` — unique (one subscription per pair); `(user_id)` — for the "channels I follow" listing; `(channel_id)` — for the subscriber count aggregate

---

### API Contracts

#### POST /channels/:channelId/subscription (SI-06.5)

**Request headers:**
- Authorization: Bearer <access_token>

**Path parameters:**
- channelId: string (uuid), required

**Request body:** none

**Response 201:**
- id: string (uuid)
- channel_id: string (uuid)
- created_at: string (ISO timestamp)

**Error responses:**
- 401: when the access token is missing or invalid
- 404 CHANNEL_NOT_FOUND: when the channel does not exist
- 409 CANNOT_SUBSCRIBE_TO_OWN_CHANNEL: when the channel belongs to the caller
- 409 ALREADY_SUBSCRIBED: when the caller already follows the channel
- 400 validation error: when `channelId` is not a valid UUID

---

#### DELETE /channels/:channelId/subscription (SI-06.5)

**Request headers:**
- Authorization: Bearer <access_token>

**Path parameters:**
- channelId: string (uuid), required

**Response 204:** No content. Idempotent — succeeds whether or not a subscription existed.

**Error responses:**
- 401: when the access token is missing or invalid
- 404 CHANNEL_NOT_FOUND: when the channel does not exist
- 400 validation error: when `channelId` is not a valid UUID

---

#### GET /me/subscriptions (SI-06.5)

**Request headers:**
- Authorization: Bearer <access_token>

**Response 200:** array of items, each:
- subscribed_at: string (ISO timestamp)
- channel: object — `{ id: string, name: string, nickname: string, description: string | null, subscriber_count: number }`

**Error responses:**
- 401: when the access token is missing or invalid

---

#### GET /channels/:channelId/subscribers/count (SI-06.5)

**Request headers:**
- Authorization: Bearer <access_token>

**Path parameters:**
- channelId: string (uuid), required

**Response 200:**
- channel_id: string (uuid)
- subscriber_count: number

**Error responses:**
- 401: when the access token is missing or invalid
- 404 CHANNEL_NOT_FOUND: when the channel does not exist
- 400 validation error: when `channelId` is not a valid UUID

#### Validation Rules — channelId path parameter

| Field | Rule | Error message |
|-------|------|---------------|
| channelId | Must be a valid UUID (v4) | channelId must be a UUID |

---

### Authorization Matrix

| Endpoint | Public | Authenticated | Notes |
|----------|--------|---------------|-------|
| POST /channels/:channelId/subscription | | ✓ | Follower = current user (`sub` claim) |
| DELETE /channels/:channelId/subscription | | ✓ | Idempotent |
| GET /me/subscriptions | | ✓ | Scoped to the current user |
| GET /channels/:channelId/subscribers/count | | ✓ | Any authenticated user, any channel |

All endpoints are protected by the global `JwtAuthGuard` (registered in Phase 02). No endpoint uses `@Public()`. Confirmation is enforced at login (Phase 02), so a valid access token already implies a confirmed account — no extra `is_confirmed` check is performed (per TD-06).

---

### Error Catalog

The error response format `{ statusCode, error, message }` was defined in Phase 02 and is inherited here. This phase adds the following domain errors:

| Code | HTTP | Message | Trigger |
|------|------|---------|---------|
| CHANNEL_NOT_FOUND | 404 | Channel not found | POST/DELETE /channels/:channelId/subscription or GET /channels/:channelId/subscribers/count with a `channelId` not present in the channels table |
| ALREADY_SUBSCRIBED | 409 | Already subscribed to this channel | POST /channels/:channelId/subscription when a subscription already exists for `(user_id, channel_id)` |
| CANNOT_SUBSCRIBE_TO_OWN_CHANNEL | 409 | Cannot subscribe to your own channel | POST /channels/:channelId/subscription when the channel's `user_id` equals the caller's id |

---

## Dependency Map

```
SI-06.1 (entity + migration, no deps)
SI-06.2 (exceptions + ChannelsService.findById, no deps)

SI-06.1 + SI-06.2
└── SI-06.3 (subscribe / unsubscribe)
    └── SI-06.4 (list / count)
        └── SI-06.5 (controller + DTO + module + e2e)
```

Linearized implementation order: SI-06.1, SI-06.2 (parallel) → SI-06.3 → SI-06.4 → SI-06.5

## Deliverables

- [ ] `Subscription` entity and migration creating the `subscriptions` table with a unique index on `(user_id, channel_id)` and indexes on `user_id` and `channel_id`
- [ ] Three domain exceptions (`CHANNEL_NOT_FOUND`, `ALREADY_SUBSCRIBED`, `CANNOT_SUBSCRIBE_TO_OWN_CHANNEL`) mapped by the existing `DomainExceptionFilter`
- [ ] `ChannelsService.findById` channel-lookup method
- [ ] `SubscriptionsService` with subscribe (409 on duplicate, 409 on own channel, 404 on missing channel) and idempotent unsubscribe
- [ ] `SubscriptionsService` listing with embedded subscriber count in a constant number of queries (no N+1) and a subscriber-count lookup
- [ ] `SubscriptionsController` exposing the four authenticated endpoints, `ChannelIdParamDto` validating the `channelId` route param
- [ ] `SubscriptionsModule` wired and registered in `AppModule`; `cleanAllTables` updated to clear `subscriptions`
- [ ] Module mirrors `auth/`: Module + Controller + DTO + Service + entity + unit/integration/e2e tests
- [ ] All SI tests pass (`docker compose -f nestjs-project/compose.yaml exec -T nestjs-api npm test -- --runInBand`)
- [ ] E2E tests pass (`docker compose -f nestjs-project/compose.yaml exec -T nestjs-api npm run test:e2e`)
- [ ] Type/compilation check passes (`docker compose -f nestjs-project/compose.yaml exec -T nestjs-api npx tsc --noEmit`)
- [ ] Project builds successfully (`docker compose -f nestjs-project/compose.yaml exec -T nestjs-api npm run build`)
