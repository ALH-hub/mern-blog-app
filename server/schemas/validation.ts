// Zod schemas for data validation

import { z } from 'zod';

// User schemas
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
    .string()
    .email('Please provide a valid email address')
    .toLowerCase()
    .optional(),
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

  author: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'Author must be a valid MongoDB ObjectId'),
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

// Type exports for TypeScript
export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
export type BlogPostCreateInput = z.infer<typeof blogPostCreateSchema>;
export type BlogPostUpdateInput = z.infer<typeof blogPostUpdateSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
