import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../core/prisma';
import { requireAdmin, requireAuth } from '../../middleware/auth';

const router = Router();
router.use(requireAuth, requireAdmin);

router.post('/games', async (req, res) => {
  const body = z.object({
    title: z.string(), slug: z.string(), shortDescription: z.string(), fullDescription: z.string(), price: z.number(),
    categoryId: z.string().uuid(), developerName: z.string(), publisherName: z.string(), version: z.string(),
    packageIdentifier: z.string(), fileSize: z.number(), minAndroidVersion: z.string(), coverImage: z.string().url(),
    checksumSha256: z.string()
  }).parse(req.body);
  res.status(201).json(await prisma.game.create({ data: { ...body, currency: 'UZS', fileSize: BigInt(body.fileSize) } }));
});

router.patch('/games/:id/featured', async (req, res) => {
  const data = z.object({ featured: z.boolean() }).parse(req.body);
  res.json(await prisma.game.update({ where: { id: req.params.id }, data }));
});

router.get('/purchases', async (_req, res) => {
  res.json(await prisma.purchase.findMany({ include: { user: true, game: true }, orderBy: { createdAt: 'desc' } }));
});

export default router;
