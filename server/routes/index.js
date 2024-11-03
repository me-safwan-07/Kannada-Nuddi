import express from 'express';

import authRoutes from './authRoutes.js';
import newsRouter from './newsRoutes.js';
import categoryRouter from './categoryRoutes.js';
const router = express.Router();

// auth routes
router.use('/auth', authRoutes);


router.use('/news', newsRouter);

// category routes
router.use('/category', categoryRouter)

export default router;