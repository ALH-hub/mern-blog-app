// Authentication and validation middleware

import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import tokenBlacklist from '../models/tokenBlacklist.js';
import User, { UserRole } from '../models/userSchema.js';
import { success } from 'zod';
import { verifyToken } from '../utils/helpers.js';
import { decode } from 'punycode';

// Authentication middleware
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    res.status(401).json({ message: 'Access token required' });
    return;
  }

  const blacklistedToken = await tokenBlacklist.findOne({ token });
  if (blacklistedToken) {
    res.status(403).json({
      success: false,
      message: 'Token has been invalidated. Please login again',
    });
    return;
  }

  const decoded = verifyToken(token);

  const user = await User.findById(decoded.userId).select('-password');
  if (!user) {
    res.status(401).json({
      success: false,
      message: 'User not found',
    });
    return;
  }

  (req as any).user = {
    userId: (
      user as typeof User.prototype & { _id: mongoose.Types.ObjectId }
    )._id.toString(),
    role: (user as typeof User.prototype & { role: UserRole }).role,
    username: (user as typeof User.prototype).username,
    email: (user as typeof User.prototype).email,
  };

  next();
};

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const user = (req as any).user;
  if (!user) {
    res.status(403).json({
      success: false,
      message: 'Access denied!',
    });

    return;
  }

  if (user.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Admin access required',
    });
    return;
  }

  next();
};

// Validation middleware
export const validateUser = [
  body('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),

  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    ),

  body('role')
    .optional()
    .isIn(Object.values(UserRole))
    .withMessage(`Role must be one of: ${Object.values(UserRole).join(', ')}`),
];

export const validateBlogPost = [
  body('title')
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),

  body('content')
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long'),
];

// Error handling middleware for validation
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
    return;
  }
  next();
};

// MongoDB ObjectId validation middleware
export const validateObjectId = (paramName: string = 'id') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: `Invalid ${paramName}` });
      return;
    }

    next();
  };
};
