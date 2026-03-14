import { Router } from 'express';
import { z } from 'zod';
import { env } from '../../config/env';
import { prisma } from '../../core/prisma';
import { requireAuth, AuthRequest } from '../../middleware/auth';
import { objectStorage } from '../../providers/container';

const router = Router();
router.use(requireAuth);

router.post('/request-token', async (req: AuthRequest, res) => {
  if (env.appMode === 'PLAY_STORE_COMPLIANT') return res.status(400).json({ message: 'External executable downloads disabled in PLAY_STORE_COMPLIANT mode' });
  const { gameId } = z.object({ gameId: z.string().uuid() }).parse(req.body);
  const entitlement = await prisma.entitlement.findUnique({ where: { userId_gameId: { userId: req.user!.id, gameId } }, include: { game: true } });
  if (!entitlement?.active) return res.status(403).json({ message: 'No entitlement' });

  const recentCount = await prisma.downloadSession.count({ where: { userId: req.user!.id, gameId, createdAt: { gte: new Date(Date.now() - 60_000) } } });
  if (recentCount > 5) return res.status(429).json({ message: 'Too many token requests' });

  const signedUrl = await objectStorage.getSignedDownloadUrl(`${entitlement.game.slug}/${entitlement.game.version}.apk`, 900);
  const session = await prisma.downloadSession.create({
    data: { userId: req.user!.id, gameId, signedUrl, expiresAt: new Date(Date.now() + 900000), ipAddress: req.ip, userAgent: req.headers['user-agent'] }
  });

  res.json({ sessionId: session.id, signedUrl, expiresAt: session.expiresAt, checksum: entitlement.game.checksumSha256, fileSize: entitlement.game.fileSize.toString() });
});

router.patch('/session/:id', async (req, res) => {
  const { status } = z.object({ status: z.enum(['issued', 'started', 'paused', 'completed', 'failed', 'canceled']) }).parse(req.body);
  const session = await prisma.downloadSession.update({ where: { id: req.params.id }, data: { status } });
  res.json(session);
});

export default router;
