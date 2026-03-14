# Production configuration checklist

## Infrastructure
- [ ] Set production PostgreSQL with backups and PITR.
- [ ] Configure managed object storage + private bucket.
- [ ] Use HTTPS + reverse proxy + HSTS.
- [ ] Move secrets to secret manager (not `.env`).

## Backend
- [ ] Replace mock payment provider with real gateway integration.
- [ ] Implement signature verification for payment webhooks.
- [ ] Add full OpenAPI docs for each route.
- [ ] Add structured audit log writes for auth, purchase, admin actions.
- [ ] Add centralized monitoring/alerts (logs, traces, metrics).
- [ ] Add background jobs for retrying failed payment callbacks.

## Mobile
- [ ] Integrate Google Play Billing for `PLAY_STORE_COMPLIANT` builds.
- [ ] Build flavor split (`direct` / `play`) with mode-specific UX.
- [ ] Harden download manager with persistent queue and resume library.
- [ ] Add localization files for English/Uzbek.
- [ ] Add crash reporting and analytics with consent.

## Compliance & legal
- [ ] Verify all uploaded games are licensed and owned.
- [ ] Keep copyright/license documentation per title.
- [ ] Create moderation flow for content updates.
- [ ] Publish privacy policy and terms.
