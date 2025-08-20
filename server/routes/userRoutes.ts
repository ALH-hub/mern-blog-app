// User routes with Zod validation

import express from 'express';
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { validateSchema, validateParams } from '../middleware/validation';
import { userCreateSchema, userUpdateSchema } from '../schemas/validation';
import { z } from 'zod';

const router = express.Router();

// Parameter validation schema
const idParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId format'),
});

// Create user route with validation
router.post('/', validateSchema(userCreateSchema), createUser);

// Get user route with parameter validation
router.get('/:id', validateParams(idParamSchema), getUser);

// Update user route with validation
router.put(
  '/:id',
  validateParams(idParamSchema),
  validateSchema(userUpdateSchema),
  updateUser,
);

// Delete user route with parameter validation
router.delete('/:id', validateParams(idParamSchema), deleteUser);

export default router;
