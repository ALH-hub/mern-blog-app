// Post routes with Zod validation

import express from 'express';
import { createPost } from '../controllers/blogPostController';
import { validateSchema, validateParams } from '../middleware/validation';
import { blogPostCreateSchema } from '../schemas/validation';
import { z } from 'zod';

const router = express.Router();

// Create Post route with validateion
router.post('/', validateSchema(blogPostCreateSchema), createPost);
