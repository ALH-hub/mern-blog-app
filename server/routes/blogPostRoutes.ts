// Post routes with Zod validation

import express from 'express';
import {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
} from '../controllers/blogPostController.js';
import { validateSchema, validateParams } from '../middleware/validation.js';
import {
  blogPostCreateSchema,
  blogPostUpdateSchema,
} from '../schemas/post.validation.js';
import { authenticateToken } from '../middleware/auth.js';
import { idParamSchema } from '../schemas/common.validation.js';

const router = express.Router();

// Create Post route with validateion
router.post(
  '/',
  authenticateToken,
  validateSchema(blogPostCreateSchema),
  createPost,
);

// Retrieve Post route with validateion
router.get('/:id', validateParams(idParamSchema), getPost);

// Get all posts route
router.get('/', getAllPosts);

// Update post route with validateion
router.put(
  '/:id',
  authenticateToken,
  validateParams(idParamSchema),
  validateSchema(blogPostUpdateSchema),
  updatePost,
);

// Delete post route with parameter validation
router.delete(
  '/:id',
  authenticateToken,
  validateParams(idParamSchema),
  deletePost,
);

export default router;
