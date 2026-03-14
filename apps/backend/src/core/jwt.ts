import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export const signAccessToken = (sub: string, role: string) => jwt.sign({ sub, role }, env.jwtAccessSecret, { expiresIn: env.jwtAccessExpiresIn });
export const signRefreshToken = (sub: string) => jwt.sign({ sub }, env.jwtRefreshSecret, { expiresIn: env.jwtRefreshExpiresIn });
