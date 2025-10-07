import express from 'express';
import { protect } from '../middleware/auth.js';
import { getUsers, getUserById } from '../controllers/userController.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// GET /api/users - Get all users (with optional role filter)
// Example: /api/users?role=doctor
router.get('/', getUsers);

// GET /api/users/:id - Get a single user by ID
router.get('/:id', getUserById);

export default router;
