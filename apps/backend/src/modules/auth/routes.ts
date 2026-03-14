import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../../core/prisma';
import { signAccessToken, signRefreshToken } from '../../core/jwt';
import { requireAuth, AuthRequest } from '../../middleware/auth';

const router = Router();
const authSchema = z.object({ email: z.string().email(), password: z.string().min(8), fullName: z.string().min(2).optional() });

router.post('/register', async (req, res) => {
  const data = authSchema.parse(req.body);
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) return res.status(409).json({ message: 'Email already exists' });
  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({ data: { email: data.email, fullName: data.fullName ?? 'User', passwordHash } });
  return res.status(201).json({ id: user.id, email: user.email });
});

router.post('/login', async (req, res) => {
  const data = authSchema.pick({ email: true, password: true }).parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) return res.status(401).json({ message: 'Invalid credentials' });
  const accessToken = signAccessToken(user.id, user.role);
  const refreshToken = signRefreshToken(user.id);
  await prisma.refreshToken.create({ data: { userId: user.id, tokenHash: await bcrypt.hash(refreshToken, 6), expiresAt: new Date(Date.now() + 7 * 86400000) } });
  return res.json({ accessToken, refreshToken, user: { id: user.id, email: user.email, role: user.role } });
});

router.post('/refresh', async (req, res) => {
  const token = z.object({ refreshToken: z.string() }).parse(req.body).refreshToken;
  const rows = await prisma.refreshToken.findMany({ where: { revokedAt: null }, include: { user: true } });
  for (const row of rows) {
    if (await bcrypt.compare(token, row.tokenHash)) {
      return res.json({ accessToken: signAccessToken(row.user.id, row.user.role) });
    }
  }
  return res.status(401).json({ message: 'Invalid refresh token' });
});

router.get('/profile', requireAuth, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  return res.json({ id: user?.id, email: user?.email, fullName: user?.fullName, role: user?.role });
});

export default router;
