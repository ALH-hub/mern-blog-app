import express from 'express';
import {
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
} from '../controllers/commentController';
import {
  validateParams,
  validateQuery,
  validateSchema,
} from '../middleware/validation';
import {
  commentCreateSchema,
  commentUpdateSchema,
  paginationSchema,
  postCommentParamsSchema,
} from '../schemas/validation';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Create comment route
router.post(
  '/:postId/comments',
  authenticateToken,
  validateSchema(commentCreateSchema),
  validateParams(postCommentParamsSchema),
  createComment,
);

// Get all post omments
router.get(
  '/:postId/comments',
  authenticateToken,
  validateParams(postCommentParamsSchema),
  validateQuery(paginationSchema),
  getPostComments,
);

// Update a post comment
router.put(
  '/:postId/comments/:commentId',
  authenticateToken,
  validateParams(postCommentParamsSchema),
  validateSchema(commentUpdateSchema),
  updateComment,
);

// Delete a post comment
router.delete(
  '/:postId/comments/:commentId',
  authenticateToken,
  validateParams(postCommentParamsSchema),
  deleteComment,
);

export default router;
