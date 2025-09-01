// Utility functions for common operations
import mongoose from 'mongoose';

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
