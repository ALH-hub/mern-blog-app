import { email, z } from 'zod';

export const userLoginSchema = z.object({
  email: z.email('Please provide a valid email address').toLowerCase(),

  password: z.string().min(1, 'Password is required'),
});

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

  password: z.string().min(6, 'Password must be at least 6 characters'),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  //   'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  // ),
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

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type PasswordResetRequestInput = z.infer<
  typeof PasswordResetRequestSchema
>;
export type PasswordResetConfirmInput = z.infer<
  typeof PasswordResetConfirmSchema
>;
