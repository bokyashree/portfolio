// routes/userRoutes.js
import express from 'express';
import { getUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

// GET user data
router.get('/user', getUser);

// UPDATE user data (Handled by AdminJS)
router.put('/user/:id', updateUser);

export default router;
