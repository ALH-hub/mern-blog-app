// Post routes with Zod validation

import express from 'express';
import {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost,
} from '../controllers/blogPostController';
import { validateSchema, validateParams } from '../middleware/validation';
import {
  blogPostCreateSchema,
  blogPostUpdateSchema,
  idParamSchema,
} from '../schemas/validation';

const router = express.Router();

// Create Post route with validateion
router.post('/', validateSchema(blogPostCreateSchema), createPost);

// Retrieve Post route with validateion
router.get('/:id', validateParams(idParamSchema), getPost);

// Get all posts route
router.get('/', getAllPosts);

// Update post route with validateion
router.put(
  '/:id',
  validateParams(idParamSchema),
  validateSchema(blogPostUpdateSchema),
  updatePost,
);

// Delete post route with parameter validation
router.delete('/:id', validateParams(idParamSchema), deletePost);

export default router;
