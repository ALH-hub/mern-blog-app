// User routes with Zod validation

import express from 'express';
import {
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from '../controllers/userController';
import { validateSchema, validateParams } from '../middleware/validation';
import {
  userCreateSchema,
  userUpdateSchema,
  idParamSchema,
} from '../schemas/validation';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get all users route
router.get('/', getAllUsers);

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
