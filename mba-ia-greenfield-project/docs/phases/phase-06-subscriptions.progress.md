# Phase 06 — Inscrição em Canais — Progress

**Status:** in_progress
**SIs:** 1/5 completed

### SI-06.1 — Subscription Entity and Migration
- **Status:** completed
- **Tests:** `subscription.entity.integration-spec.ts` — 5 passed (unique constraint, FK to users/channels, created_at default, two users same channel)
- **Observations:** Migration `1782247364948-CreateSubscriptions` generated via TypeORM CLI; applies cleanly on the migrated DB. Existing `migrations.integration-spec.ts` is unaffected (it registers migration classes explicitly, not via glob).

### SI-06.2 — Domain Exceptions and Channel Lookup
- **Status:** pending
- **Tests:** —
- **Observations:** —

### SI-06.3 — SubscriptionsService: Subscribe and Unsubscribe
- **Status:** pending
- **Tests:** —
- **Observations:** —

### SI-06.4 — SubscriptionsService: List and Subscriber Count
- **Status:** pending
- **Tests:** —
- **Observations:** —

### SI-06.5 — Controller, DTO, Module, E2E
- **Status:** pending
- **Tests:** —
- **Observations:** —
