// Comment validation schemas
import { z } from 'zod';

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

export type CommentCreateInput = z.infer<typeof commentCreateSchema>;
export type CommentUpdateInput = z.infer<typeof commentUpdateSchema>;
export type PostCommentParamsInput = z.infer<typeof postCommentParamsSchema>;
