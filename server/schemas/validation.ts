// Zod schemas for data validation

import { email, z } from 'zod';

// Blog post schemas
export const blogPostCreateSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be at most 100 characters')
    .trim(),

  content: z.string().min(10, 'Content must be at least 10 characters').trim(),
});

export const blogPostUpdateSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must be at most 100 characters')
    .trim()
    .optional(),

  content: z
    .string()
    .min(10, 'Content must be at least 10 characters')
    .trim()
    .optional(),
});

// Comment validation schemas
export const commentCreateSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment content must be at least 10 characters')
    .max(1000, 'Content must be at most 1000 characters')
    .trim(),
  parentCommentId: z
    .string()
    .regex(/^[0-9a-fA-F]{24$/, 'Invalid parent comment ID')
    .optional(),
});

export const commentUpdateSchema = z.object({
  content: z
    .string()
    .min(1, 'Comment content is required')
    .max(1000, 'Content must be at most 1000 characters')
    .trim(),
});

export const postCommentParamsSchema = z.object({
  postId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalide post ID'),
  commentId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Ivalid comment ID')
    .optional(),
});

// Type exports for TypeScript
export type BlogPostCreateInput = z.infer<typeof blogPostCreateSchema>;
export type BlogPostUpdateInput = z.infer<typeof blogPostUpdateSchema>;

export type CommentCreateInput = z.infer<typeof commentCreateSchema>;
export type CommentUpdateInput = z.infer<typeof commentUpdateSchema>;
export type PostCommentParamsInput = z.infer<typeof postCommentParamsSchema>;
