import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import authRoutes from './modules/auth/routes';
import gamesRoutes from './modules/games/routes';
import purchaseRoutes from './modules/purchases/routes';
import libraryRoutes from './modules/library/routes';
import downloadRoutes from './modules/downloads/routes';
import adminRoutes from './modules/admin/routes';
import healthRoutes from './modules/health/routes';
import { errorHandler } from './middleware/error';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
app.use('/api/auth', rateLimit({ windowMs: 60_000, max: 30 }), authRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/purchases', rateLimit({ windowMs: 60_000, max: 60 }), purchaseRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/downloads', rateLimit({ windowMs: 60_000, max: 30 }), downloadRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/health', healthRoutes);

const swaggerSpec = swaggerJSDoc({ definition: { openapi: '3.0.0', info: { title: 'GameHub API', version: '1.0.0' } }, apis: [] });
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;
