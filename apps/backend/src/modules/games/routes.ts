import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../../core/prisma';

const router = Router();

router.get('/', async (req, res) => {
  const query = z.object({ q: z.string().optional(), category: z.string().optional(), sort: z.enum(['newest', 'popular', 'price']).optional(), minPrice: z.string().optional(), maxPrice: z.string().optional(), featured: z.string().optional() }).parse(req.query);
  const games = await prisma.game.findMany({
    where: {
      active: true,
      title: query.q ? { contains: query.q, mode: 'insensitive' } : undefined,
      category: query.category ? { slug: query.category } : undefined,
      featured: query.featured === 'true' ? true : undefined,
      price: {
        gte: query.minPrice ? Number(query.minPrice) : undefined,
        lte: query.maxPrice ? Number(query.maxPrice) : undefined
      }
    },
    orderBy: query.sort === 'price' ? { price: 'asc' } : { createdAt: 'desc' },
    include: { category: true, media: true }
  });
  res.json(games);
});

router.get('/categories', async (_req, res) => res.json(await prisma.category.findMany()));
router.get('/:slug', async (req, res) => {
  const game = await prisma.game.findUnique({ where: { slug: req.params.slug }, include: { media: true, category: true } });
  if (!game) return res.status(404).json({ message: 'Not found' });
  return res.json(game);
});

export default router;
