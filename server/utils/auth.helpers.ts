import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
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

// Authorization utilities
export const authorizedUser = (
  userId: string,
  role: string,
  id: string,
): boolean => {
  if (role !== 'admin' && userId !== id) {
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
