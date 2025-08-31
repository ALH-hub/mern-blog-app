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

const routes = express.Router();

// Create comment route
routes.post(
  '/:postId/comments',
  authenticateToken,
  validateSchema(commentCreateSchema),
  validateParams(postCommentParamsSchema),
  createComment,
);

// Get all post omments
routes.get(
  '/:postId/comments',
  authenticateToken,
  validateParams(postCommentParamsSchema),
  validateQuery(paginationSchema),
  getPostComments,
);

// Update a post comment
routes.put(
  '/:postId/comments/:commentId',
  authenticateToken,
  validateParams(postCommentParamsSchema),
  validateSchema(commentUpdateSchema),
  updateComment,
);

// Delete a post comment
routes.delete(
  '/:postId/comments/:commentId',
  authenticateToken,
  validateParams(postCommentParamsSchema),
  deleteComment,
);
