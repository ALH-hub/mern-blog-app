import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from '../controllers/userController.js';
import {
  validateSchema,
  validateParams,
} from '../middleware/validateSchema.middleware.js';
import { userUpdateSchema } from '../schemas/auth.validation.js';
import {
  authenticateToken,
  verifyAdmin,
} from '../middleware/auth.middleware.js';
import { idParamSchema } from '../schemas/common.validation.js';

const router = express.Router();

// Get all users route
router.get('/', authenticateToken, verifyAdmin, getAllUsers);

// Get user route with parameter validation
router.get('/:id', validateParams(idParamSchema), getUser);

// Update user route with validation
router.put(
  '/:id',
  authenticateToken,
  validateParams(idParamSchema),
  validateSchema(userUpdateSchema),
  updateUser,
);

// Delete user route with parameter validation
router.delete(
  '/:id',
  authenticateToken,
  validateParams(idParamSchema),
  deleteUser,
);

export default router;
