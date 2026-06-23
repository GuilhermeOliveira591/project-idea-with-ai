# Technical Decisions — Phase 06: Inscrição em Canais (Subscriptions)

> **Phase:** 06 — Interações Sociais (recorte: Inscrição em Canais)
> **Status:** Finalized
> **Date:** 2026-06-23

---

> **Scope note.** Phase 06 in `project-plan.md` covers likes, comments, and
> subscriptions. This document only addresses **channel subscriptions
> (follow/unfollow)** — the only Phase 06 capability that does not depend on the
> video entity (Phases 03–05, not implemented). Likes and comments operate on
> videos and are out of scope. Decisions here build only on Phase 02 (`User`,
> `Channel`, global `JwtAuthGuard`, domain exception filter).

## TD-01: Subscription Persistence Model

**Context:** A subscription links one authenticated user to one channel they
follow. We need a persistence shape that enforces "one subscription per
(user, channel)" and supports both the "channels I follow" listing and the
"subscriber count" of a channel. Affects the data model and every endpoint.

**Options:**

### Option A: Dedicated `Subscription` join entity (user_id, channel_id, created_at)
- A new `subscriptions` table with its own UUID PK, FKs to `users` and
  `channels`, a `created_at`, and a unique constraint on `(user_id, channel_id)`.
  Each follow is one row; unfollow deletes the row.
- **Pros:** Mirrors the Phase 02 entity-per-concern style. Unique constraint
  enforces idempotency at the DB level. `created_at` enables "recently followed"
  ordering. Subscriber count is a simple `COUNT(*) WHERE channel_id = ?`.
  Natural place for future per-subscription metadata (notifications, muted).
- **Cons:** One extra table and module. Slightly more code than a counter column.

### Option B: `@ManyToMany` join table managed by TypeORM
- Model the relation as `User.subscribedChannels` `@ManyToMany(() => Channel)`
  with a `@JoinTable`. TypeORM owns the implicit junction table.
- **Pros:** Less explicit entity code. TypeORM generates the join table.
- **Cons:** The implicit junction table has no `created_at` and no addressable
  entity, so "recently followed" ordering and future metadata are impossible
  without migrating to an explicit entity later. Harder to write a clean
  `COUNT` and to attach domain rules (self-subscription) at the service layer.
  Diverges from the project's explicit-entity convention.

### Option C: Denormalized `subscriber_count` column on `channels`
- Add a counter column to `channels`, incremented/decremented on follow/unfollow,
  plus a separate table only to know *who* follows whom.
- **Pros:** O(1) subscriber count read.
- **Cons:** Two sources of truth that can drift under concurrency; needs
  transactional increment and is overkill for the current scale. Still needs a
  join table for the listing. Premature optimization.

**Recommendation:** **Option A** — an explicit `Subscription` entity matches the
project's conventions (one entity per concern, explicit columns, UUID PK,
timestamps), enforces uniqueness in the DB, and keeps both reads
(listing + count) trivial. The count can be denormalized later if profiling
justifies it.

**Decision:** A (dedicated `Subscription` join entity)

---

## TD-02: Duplicate Subscribe Behavior (idempotent vs. conflict)

**Context:** `POST /channels/:channelId/subscription` may be called when the user
already follows the channel. The unique constraint from TD-01 guarantees no
duplicate row, but the API must decide what HTTP outcome the caller sees.

**Options:**

### Option A: Conflict — 409 `ALREADY_SUBSCRIBED`
- The service checks for an existing subscription (or catches the unique
  violation) and throws a domain exception mapped to 409.
- **Pros:** Explicit, testable signal that the state already existed. Consistent
  with Phase 02's domain-error style (`EMAIL_ALREADY_EXISTS` is the same shape:
  a uniqueness conflict surfaced as 409). The frontend can distinguish "you just
  followed" from "you already followed" if it ever needs to.
- **Cons:** The client must tolerate a 409 on a double-click; strictly, a
  follow button is naturally idempotent from the user's mental model.

### Option B: Idempotent — 201/204 always, no error on repeat
- Repeat calls silently succeed, returning the same success as the first.
- **Pros:** Friendliest for a toggle button; double-clicks never error.
- **Cons:** Hides state from the API contract; "created" vs "already existed"
  becomes indistinguishable. Inconsistent with how Phase 02 models uniqueness
  conflicts (it raises 409 rather than swallowing).

**Recommendation:** **Option A** — surface the conflict as **409
`ALREADY_SUBSCRIBED`**, mirroring `EMAIL_ALREADY_EXISTS`. POST creates a
resource; a second creation of the same resource is a conflict. This keeps the
contract explicit and aligns with the existing error-catalog philosophy.
(Note the deliberate asymmetry with TD-03: POST-create is *not* idempotent,
DELETE *is* — each follows its own REST semantics.)

**Decision:** A (409 `ALREADY_SUBSCRIBED`)

---

## TD-03: Unsubscribe of a Non-existent Subscription (idempotent vs. error)

**Context:** `DELETE /channels/:channelId/subscription` may be called when the
user is not subscribed (never followed, or already unfollowed).

**Options:**

### Option A: Idempotent — 204 No Content regardless
- If no subscription exists, the endpoint still returns 204; the post-condition
  ("the user does not follow this channel") already holds.
- **Pros:** Matches REST semantics for DELETE — deleting an absent resource
  leaves the system in the requested state, so it is not an error. Robust to
  double-clicks and retries. Simplest client contract for a toggle.
- **Cons:** The caller cannot tell "I just unfollowed" from "there was nothing
  to unfollow" (acceptable for a follow toggle).

### Option B: Error — 404 `SUBSCRIPTION_NOT_FOUND`
- Throw when there is no row to delete.
- **Pros:** Explicit signal that nothing was deleted.
- **Cons:** Punishes the common retry/double-click case with an error;
  contradicts DELETE idempotency. The channel-not-found case (TD-04) already
  covers the genuinely-wrong-target scenario.

**Recommendation:** **Option A** — **204 idempotent**. DELETE is idempotent by
REST convention: the desired end state ("not following") is reached whether or
not a row existed. This pairs intentionally with TD-02 (POST-create conflicts,
DELETE does not).

**Decision:** A (204 idempotent — no error when not subscribed)

---

## TD-04: Self-subscription Prevention

**Context:** The scope forbids a user from subscribing to their own channel. We
need to decide where the check lives and which error it produces. Each user owns
exactly one channel (Phase 02, `channels.user_id` unique).

**Options:**

### Option A: Service-layer check comparing channel owner to current user — 409 `CANNOT_SUBSCRIBE_TO_OWN_CHANNEL`
- The subscribe flow loads the target channel, compares `channel.user_id` to the
  authenticated `userId`, and throws a domain exception if they match.
- **Pros:** Business rule lives in the service (per `nestjs-layer-separation`).
  Reuses the channel lookup already needed for the 404 check (TD-05), so no
  extra query. Domain error is explicit and testable. 409 expresses "the request
  conflicts with an invariant of the target resource".
- **Cons:** Requires the channel's owner to be known at subscribe time (already
  loaded for the existence check, so effectively free).

### Option B: Guard/DB-level prevention
- Encode the rule in a guard or a DB `CHECK` constraint.
- **Pros:** Centralized at the boundary.
- **Cons:** A guard embedding this comparison would leak business logic into the
  infrastructure layer (forbidden by `nestjs-layer-separation`). A DB `CHECK`
  cannot compare across tables (owner lives on `channels`, not on the
  subscription row) without a trigger — overkill.

**Recommendation:** **Option A** — check in the service and throw **409
`CANNOT_SUBSCRIBE_TO_OWN_CHANNEL`**, reusing the channel lookup from the
existence check. Keeps domain logic in the service and avoids an extra query.

**Decision:** A (service check → 409 `CANNOT_SUBSCRIBE_TO_OWN_CHANNEL`)

---

## TD-05: Channel-not-found Handling

**Context:** Any of the endpoints can receive a `channelId` that does not exist.
The scope mandates a 404 for a non-existent channel.

**Options:**

### Option A: Explicit lookup + domain exception — 404 `CHANNEL_NOT_FOUND`
- The service loads the channel by id; if `findOne` returns `null`, it throws a
  domain exception mapped to 404 by the existing filter.
- **Pros:** Consistent with `typeorm-queries` guidance (`findOne` + explicit
  domain exception, not `findOneOrFail`). Produces the standard
  `{ statusCode, error, message }` body via the existing `DomainExceptionFilter`.
  The same lookup feeds the self-subscription check (TD-04).
- **Cons:** One query, which is required anyway for the owner check.

### Option B: Rely on the FK violation at insert time
- Skip the lookup and let the `channel_id` FK raise on insert.
- **Pros:** No pre-check query.
- **Cons:** Produces a raw DB error, not a clean 404; can't power the
  self-subscription rule; doesn't help unsubscribe/count where there is no
  insert. Inconsistent error shape.

**Recommendation:** **Option A** — explicit lookup returning **404
`CHANNEL_NOT_FOUND`**. One query serves existence (404), ownership (TD-04), and a
clean domain-mapped response.

**Decision:** A (explicit lookup → 404 `CHANNEL_NOT_FOUND`)

---

## TD-06: Behavior for Unconfirmed Users (`is_confirmed = false`)

**Context:** The scope asks us to decide and document what happens when an
unconfirmed user hits these endpoints. All endpoints are protected by the global
`JwtAuthGuard`.

**Options:**

### Option A: Rely on login-time confirmation gate — no extra check
- Phase 02 `login` throws `EmailNotConfirmedException` (403) when
  `is_confirmed = false`, so an unconfirmed user can never obtain an access
  token. By the time a request carries a valid JWT, the account was confirmed at
  login. Therefore subscription endpoints need no additional confirmation check.
- **Pros:** No redundant logic; single source of truth for the confirmation gate
  (login). No duplicated `is_confirmed` checks spread across feature modules.
  Matches how every other authenticated endpoint in the project behaves.
- **Cons:** If a future change issued tokens before confirmation, this assumption
  would need revisiting (documented here so it is explicit).

### Option B: Re-check `is_confirmed` in the subscription service — 403
- Load the user and reject unconfirmed accounts again at subscribe time.
- **Pros:** Defense in depth if token issuance ever changes.
- **Cons:** Redundant today (unconfirmed users cannot log in), adds a query and
  a branch with no observable effect, and spreads the confirmation rule outside
  auth.

**Recommendation:** **Option A** — **no extra check**. Confirmation is enforced
once, at login; a valid access token already implies a confirmed account. This
is documented as an explicit assumption rather than re-implemented per feature.

**Decision:** A (no extra confirmation check — enforced at login)

---

## TD-07: How the Subscriber Count Is Exposed

**Context:** The scope requires a channel's subscriber count to be reachable
("contagem de inscritos na página do canal"), and leaves the exact shape to this
decision. Phase 02 left `channels/` without an HTTP controller; channel
management (its own read/edit endpoints) belongs to Phase 04, which is out of
scope here.

**Options:**

### Option A: Dedicated authenticated count endpoint — `GET /channels/:channelId/subscribers/count`
- A subscriptions-owned endpoint returns `{ channel_id, subscriber_count }` for
  any channel. The "channels I follow" listing (`GET /me/subscriptions`)
  additionally embeds each followed channel's `subscriber_count`.
- **Pros:** Keeps the count inside the Subscriptions module (it is a subscription
  aggregate, not channel-management data), so we do not create a channel-detail
  endpoint that belongs to Phase 04. Both required surfaces are covered: the
  channel-page count and the followed-channels list. Stays within the
  "all endpoints authenticated" constraint of the scope.
- **Cons:** The count lives under a `channels/:id/...` path while being served by
  the subscriptions module — a deliberate nested-resource choice, documented
  here.

### Option B: Add `subscriber_count` to a new channel-detail endpoint (`GET /channels/:channelId`)
- Build a channel read endpoint now and include the count in it.
- **Pros:** "On the channel response" literally.
- **Cons:** Creates channel-management surface (a channel-detail GET) that is
  Phase 04 scope, expanding beyond this recorte and forcing decisions about the
  channel representation that this phase should not own.

### Option C: Count only embedded in `GET /me/subscriptions`
- Expose the count solely as a field of each followed-channel item.
- **Pros:** Smallest surface.
- **Cons:** Provides no way to read the count for a channel the user does *not*
  follow, so it fails the "subscriber count on the channel page" requirement.

**Recommendation:** **Option A** — a dedicated, authenticated **`GET
/channels/:channelId/subscribers/count`** plus an embedded `subscriber_count` on
each item of `GET /me/subscriptions`. This satisfies both the channel-page count
and the followed-list view, keeps the aggregate in the Subscriptions module, and
avoids prematurely building Phase 04's channel-detail endpoint.

**Decision:** A (dedicated count endpoint + embedded count in the listing)

---

## TD-08: N+1 Avoidance in the Subscriptions Listing

**Context:** `GET /me/subscriptions` returns the channels a user follows. Loading
each subscription and then its channel lazily would issue one query per
subscription (N+1). The scope explicitly requires avoiding N+1.

**Options:**

### Option A: Single query with a join (`relations: ['channel']` / `leftJoinAndSelect`)
- Load all of the user's subscriptions joining the `channels` table in one query,
  then map to the response (optionally a second aggregate query for counts).
- **Pros:** One query for the list regardless of N. Idiomatic TypeORM. Aligns
  with the project's intent behind the `db-avoid-n-plus-one` guidance and the
  `typeorm-queries` rules (load only what is needed, explicitly).
- **Cons:** If each item also needs its live `subscriber_count`, that is a
  separate grouped aggregate query (still O(1) queries total, not O(N)).

### Option B: Lazy relations / per-item lookups
- Fetch subscriptions, then resolve each `channel` on access.
- **Pros:** Simple to write.
- **Cons:** Classic N+1 — one query per followed channel. Explicitly forbidden by
  the scope.

**Recommendation:** **Option A** — eager-join the channel in a single query and,
for the embedded counts, use one grouped `COUNT ... GROUP BY channel_id`
aggregate. Total queries for the listing stay constant regardless of how many
channels the user follows.

**Decision:** A (single join query + one grouped count aggregate)

---

## Decisions Summary

| ID | Decision | Recommendation | Choice |
|----|----------|---------------|--------|
| TD-01 | Subscription Persistence Model | Dedicated `Subscription` entity | A (dedicated join entity) |
| TD-02 | Duplicate Subscribe Behavior | 409 conflict | A (409 `ALREADY_SUBSCRIBED`) |
| TD-03 | Unsubscribe of Non-existent Subscription | 204 idempotent | A (204 idempotent) |
| TD-04 | Self-subscription Prevention | Service check → 409 | A (409 `CANNOT_SUBSCRIBE_TO_OWN_CHANNEL`) |
| TD-05 | Channel-not-found Handling | Lookup → 404 | A (404 `CHANNEL_NOT_FOUND`) |
| TD-06 | Unconfirmed Users | No extra check (login gate) | A (enforced at login) |
| TD-07 | Subscriber Count Exposure | Dedicated count endpoint + embedded | A (count endpoint + listing field) |
| TD-08 | N+1 Avoidance in Listing | Single join query + grouped count | A (join + grouped aggregate) |
