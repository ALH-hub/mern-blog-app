// Authentication routes

import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  requestPasswordReset,
  confirmPasswordReset,
} from '../controllers/authControlllers.js';
import {
  authenticateToken,
  handleValidationErrors,
} from '../middleware/auth.js';
import {
  PasswordResetConfirmSchema,
  PasswordResetRequestSchema,
  userCreateSchema,
  userLoginSchema,
} from '../schemas/validation.js';

import { validateSchema } from '../middleware/validation.js';

const routes = express.Router();

// Register a new user route
routes.post(
  '/register',
  validateSchema(userCreateSchema),
  handleValidationErrors,
  registerUser,
);

// Login into your account route
routes.post(
  '/login',
  validateSchema(userLoginSchema),
  handleValidationErrors,
  loginUser,
);

// Logout from your account route
routes.post('/logout', authenticateToken, logoutUser);

// Request for password reset route
routes.post(
  '/password-reset',
  validateSchema(PasswordResetRequestSchema),
  requestPasswordReset,
);

// Confirm your password reset request route
routes.post(
  '/password-reset/confirm',
  validateSchema(PasswordResetConfirmSchema),
  confirmPasswordReset,
);

export default routes;
