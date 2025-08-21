// User routes with Zod validation

import express from 'express';
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from '../controllers/userController';
import { validateSchema, validateParams } from '../middleware/validation';
import {
  userCreateSchema,
  userUpdateSchema,
  objectIdSchema,
} from '../schemas/validation';

const router = express.Router();

// Create user route with validation
router.post('/', validateSchema(userCreateSchema), createUser);

// Get all users route
router.get('/', getAllUsers);

// Get user route with parameter validation
router.get('/:id', validateParams(objectIdSchema), getUser);

// Update user route with validation
router.put(
  '/:id',
  validateParams(objectIdSchema),
  validateSchema(userUpdateSchema),
  updateUser,
);

// Delete user route with parameter validation
router.delete('/:id', validateParams(objectIdSchema), deleteUser);

export default router;
