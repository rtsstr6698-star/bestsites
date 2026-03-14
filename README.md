# GameHub Monorepo

GameHub is an Android game marketplace solution with a secure backend and Flutter client, designed for **legal distribution only** of owned/licensed content.

## Folder structure
- `apps/backend` - Express + TypeScript + Prisma + PostgreSQL API
- `apps/mobile` - Flutter (Riverpod + go_router + Dio)
- `packages/shared` - shared contracts (reserved)
- `docs` - architecture/API docs

## Quick start

### 1) Backend
```bash
cd apps/backend
cp .env.example .env
npm install
docker compose up -d
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

### 2) Flutter app
```bash
cd apps/mobile
cp .env.example .env
flutter pub get
flutter run
```

Android emulator API points to `http://10.0.2.2:3000`.

## Business/legal guardrails
- No piracy, no scraping, no license bypassing.
- Content must be owned or licensed by operator.
- `PLAY_STORE_COMPLIANT` mode blocks executable external downloads and expects compliant fulfillment.

## Security included
- JWT auth + refresh token persistence.
- Password hashing (`bcryptjs`).
- Entitlement-checked signed download URL flow.
- Rate limiting on auth/purchase/download endpoints.
- Payload validation with Zod.
- AuditLog schema ready for event logging.
- Payment verification server-side only.

## Development payment architecture
- `PaymentProvider` abstraction.
- `MockPaymentProvider` implementation for local development.
- Webhook endpoint placeholder for callback integration.

## Tests
```bash
npm run backend:test
cd apps/mobile && flutter test
```

## Production checklist
See `docs/production-checklist.md`.
