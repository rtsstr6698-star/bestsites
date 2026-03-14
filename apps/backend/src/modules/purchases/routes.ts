import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../core/prisma';
import { requireAuth, AuthRequest } from '../../middleware/auth';
import { paymentProvider } from '../../providers/container';

const router = Router();
router.use(requireAuth);

router.post('/create-order', async (req: AuthRequest, res) => {
  const { gameId } = z.object({ gameId: z.string().uuid() }).parse(req.body);
  const game = await prisma.game.findUnique({ where: { id: gameId } });
  if (!game) return res.status(404).json({ message: 'Game not found' });
  const purchase = await prisma.purchase.upsert({
    where: { userId_gameId: { userId: req.user!.id, gameId } },
    update: { status: 'PENDING' },
    create: { userId: req.user!.id, gameId, amount: game.price, currency: game.currency }
  });
  return res.status(201).json(purchase);
});

router.post('/initiate-payment', async (req, res) => {
  const { purchaseId } = z.object({ purchaseId: z.string().uuid() }).parse(req.body);
  const purchase = await prisma.purchase.findUnique({ where: { id: purchaseId } });
  if (!purchase) return res.status(404).json({ message: 'Purchase not found' });
  const result = await paymentProvider.initiate({ purchaseId, amount: Number(purchase.amount), currency: purchase.currency });
  await prisma.paymentTransaction.create({ data: { purchaseId, provider: 'mock', providerRef: result.providerRef, amount: purchase.amount, currency: purchase.currency } });
  return res.json(result);
});

router.post('/verify-payment', async (req, res) => {
  const { providerRef } = z.object({ providerRef: z.string() }).parse(req.body);
  const tx = await prisma.paymentTransaction.findFirst({ where: { providerRef }, include: { purchase: true } });
  if (!tx) return res.status(404).json({ message: 'Transaction not found' });
  const verification = await paymentProvider.verify(providerRef);
  await prisma.paymentTransaction.update({ where: { id: tx.id }, data: { status: verification.status === 'SUCCESS' ? 'SUCCESS' : verification.status } });
  if (verification.status === 'SUCCESS') {
    await prisma.purchase.update({ where: { id: tx.purchaseId }, data: { status: 'PAID' } });
    await prisma.entitlement.upsert({ where: { userId_gameId: { userId: tx.purchase.userId, gameId: tx.purchase.gameId } }, update: { active: true }, create: { userId: tx.purchase.userId, gameId: tx.purchase.gameId, source: 'purchase' } });
  }
  return res.json({ status: verification.status });
});

router.get('/status/:purchaseId', async (req, res) => {
  return res.json(await prisma.purchase.findUnique({ where: { id: req.params.purchaseId }, include: { paymentTxns: true } }));
});

router.get('/orders/history', async (req: AuthRequest, res) => {
  const orders = await prisma.purchase.findMany({ where: { userId: req.user!.id }, include: { game: true }, orderBy: { createdAt: 'desc' } });
  return res.json(orders);
});

router.post('/webhook/mock', async (req, res) => {
  const payload = z.object({ providerRef: z.string(), status: z.enum(['SUCCESS', 'FAILED', 'PENDING']) }).parse(req.body);
  await prisma.paymentTransaction.updateMany({ where: { providerRef: payload.providerRef }, data: { webhookPayload: payload, status: payload.status } });
  res.json({ ok: true });
});

export default router;
