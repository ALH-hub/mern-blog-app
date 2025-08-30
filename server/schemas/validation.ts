// Zod schemas for data validation

import { email, z } from 'zod';

// User validation schemas
export const userCreateSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores',
    ),

  email: z.email('Please provide a valid email address').toLowerCase(),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    ),

  role: z.string().toLowerCase().optional(),
});

export const userUpdateSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores',
    )
    .optional(),

  email: z
    .email('Please provide a valid email address')
    .toLowerCase()
    .optional(),

  role: z
    .string()
    .min(4, 'Role must be at least 4 characters')
    .max(6, 'Role must be at most 6 characters'),
});

export const userLoginSchema = z.object({
  email: z.email('Please provide a valid email address').toLowerCase(),

  password: z.string().min(1, 'Password is required'),
});

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
  commentId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Ivalid comment ID'),
});

// Parameter validation schema
export const idParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId format'),
});

// MongoDB ObjectId schema
export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId format');

// Pagination schema
export const paginationSchema = z.object({
  page: z
    .string()
    .default('1')
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0, 'Page must be greater than 0'),

  limit: z
    .string()
    .default('10')
    .transform((val) => parseInt(val, 10))
    .refine((val) => val > 0 && val <= 100, 'Limit must be between 1 and 100'),
});

// File upload schema
export const fileUploadSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z
    .string()
    .refine(
      (type) => ['image/jpeg', 'image/png', 'image/gif'].includes(type),
      'File must be a valid image (JPEG, PNG, or GIF)',
    ),
  size: z.number().max(5 * 1024 * 1024, 'File size must be less than 5MB'),
});

// Password reset schema
export const PasswordResetRequestSchema = z.object({
  email: z.email('Invalid email format'),
});

export const PasswordResetConfirmSchema = z.object({
  email: z.email('Invalid email format'),
  resetCode: z.string().min(6, 'Reset code must be 6 characters long'),
  newPassword: z
    .string()
    .min(6, 'New password must be at least 6 characters long'),
});

// Type exports for TypeScript
export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
export type BlogPostCreateInput = z.infer<typeof blogPostCreateSchema>;
export type BlogPostUpdateInput = z.infer<typeof blogPostUpdateSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type PasswordResetRequestInput = z.infer<
  typeof PasswordResetRequestSchema
>;
export type PasswordResetConfirmInput = z.infer<
  typeof PasswordResetConfirmSchema
>;
export type CommentCreateInput = z.infer<typeof commentCreateSchema>;
export type CommentUpdateInput = z.infer<typeof commentUpdateSchema>;
export type PostCommentParamsInput = z.infer<typeof postCommentParamsSchema>;
