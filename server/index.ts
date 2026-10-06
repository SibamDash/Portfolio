import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRoutes from './auth';
import projectsRoutes from './projects';
import githubRoutes from './github';
import publicProjectsRoutes from './public-projects';
import { adminPostsRouter, publicPostsRouter } from './posts';
import { db } from '../src/prisma/db';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/projects', projectsRoutes);
app.use('/api/admin/posts', adminPostsRouter);
app.use('/api/admin/github', githubRoutes);
app.use('/api/projects', publicProjectsRoutes);
app.use('/api/posts', publicPostsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

try {
  await db.connect();
  console.log("Connected to the database");
} catch (e) {
  console.error("Failed to connect to the database:", e);
}

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
