import express from 'express';
import {
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
} from '../controllers/commentController.js';
import {
  validateParams,
  validateQuery,
  validateSchema,
} from '../middleware/validation.js';
import {
  commentCreateSchema,
  commentUpdateSchema,
  postCommentParamsSchema,
} from '../schemas/comment.validation.js';
import { authenticateToken } from '../middleware/auth.js';
import { paginationSchema } from '../schemas/common.validation.js';

const router = express.Router();

// Create comment route
router.post(
  '/',
  authenticateToken,
  validateSchema(commentCreateSchema),
  validateParams(postCommentParamsSchema),
  createComment,
);

// Get all post omments
router.get(
  '/',
  authenticateToken,
  validateParams(postCommentParamsSchema),
  validateQuery(paginationSchema),
  getPostComments,
);

// Update a post comment
router.put(
  '/:commentId',
  authenticateToken,
  validateParams(postCommentParamsSchema),
  validateSchema(commentUpdateSchema),
  updateComment,
);

// Delete a post comment
router.delete(
  '/:commentId',
  authenticateToken,
  validateParams(postCommentParamsSchema),
  deleteComment,
);

export default router;
