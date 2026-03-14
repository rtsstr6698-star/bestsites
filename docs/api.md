# GameHub API overview

Base URL: `http://localhost:3000/api`

## Modes
- `DIRECT_DISTRIBUTION` (default): supports signed download URLs.
- `PLAY_STORE_COMPLIANT`: disables executable download endpoints.

## Core endpoints
- Auth: `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/profile`
- Catalog: `/games`, `/games/:slug`, `/games/categories`
- Purchases: `/purchases/create-order`, `/purchases/initiate-payment`, `/purchases/verify-payment`, `/purchases/orders/history`
- Library: `/library`, `/library/entitlement/:gameId`
- Downloads (DIRECT_DISTRIBUTION only): `/downloads/request-token`, `/downloads/session/:id`
- Admin: `/admin/games`, `/admin/games/:id/featured`, `/admin/purchases`
- Health: `/health`
