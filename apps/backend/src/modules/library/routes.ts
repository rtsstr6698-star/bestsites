import { Router } from 'express';
import { requireAuth, AuthRequest } from '../../middleware/auth';
import { prisma } from '../../core/prisma';

const router = Router();
router.use(requireAuth);

router.get('/', async (req: AuthRequest, res) => {
  const items = await prisma.entitlement.findMany({ where: { userId: req.user!.id, active: true }, include: { game: true } });
  res.json(items);
});

router.get('/entitlement/:gameId', async (req: AuthRequest, res) => {
  const ent = await prisma.entitlement.findUnique({ where: { userId_gameId: { userId: req.user!.id, gameId: req.params.gameId } } });
  res.json({ entitled: Boolean(ent?.active) });
});

export default router;
