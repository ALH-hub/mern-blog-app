// Utility functions for common operations

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import crypto from 'crypto';

// Password utilities
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateResetCode = (): string => {
  return crypto.randomBytes(6).toString('hex').toUpperCase();
};

// Authorized utitilites
export const authorizedUser = (
  userId: string,
  role: string,
  id: string,
): boolean => {
  if (userId !== id || role !== 'admin') {
    return false;
  }
  return true;
};

// JWT utilities
export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

// MongoDB utilities
export const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const toObjectId = (id: string): mongoose.Types.ObjectId | null => {
  return isValidObjectId(id) ? new mongoose.Types.ObjectId(id) : null;
};

// Response utilities
export const successResponse = (message: string, data?: any) => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (message: string, error?: any) => {
  return {
    success: false,
    message,
    error: error?.message || error,
  };
};

// String utilities
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

export const generateRandomString = (length: number = 10): string => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Date utilities
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const isExpired = (date: Date): boolean => {
  return date.getTime() < Date.now();
};
