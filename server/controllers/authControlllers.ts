// Defining the auth controllers

import { Request, Response } from 'express';
import User from '../models/userSchema.js';
import tokenBlacklist from '../models/tokenBlacklistSchema.js';
import PasswordReset from '../models/passwordResetSchema.js';

import {
  comparePassword,
  generateToken,
  hashPassword,
  generateResetCode,
} from '../utils/helpers.js';
import sendPasswordResetEmail from '../utils/emailService.js';

import {
  PasswordResetRequestInput,
  UserCreateInput,
} from '../schemas/auth.validation.js';

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // At this point, req.body is already validated by Zod middleware
    const { username, email, password, role }: UserCreateInput = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
      return;
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    let registerNewUser = {};
    if (role) {
      // Create new user
      registerNewUser = {
        username,
        email,
        password: hashedPassword,
        role,
      };
    } else {
      registerNewUser = {
        username,
        email,
        password: hashedPassword,
      };
    }

    const newUser = new User(registerNewUser);

    const savedUser = await newUser.save();

    const token = generateToken(savedUser._id as string);

    // Remove password from response
    const userResponse = {
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      posts: savedUser.posts,
      role: savedUser.role,
      token: token,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    // Check password
    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    const token = generateToken(user._id as string);

    // Remove password from response
    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      posts: user.posts,
      token: token,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(400).json({
        success: false,
        message: 'No token provided',
      });
      return;
    }

    // Add token to blacklist
    const blacklistedToken = new tokenBlacklist({
      token,
      userId: (req as any).user.userId,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    });
    await blacklistedToken.save();

    res.status(200).json({
      success: true,
      message: 'User logged out',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging out user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const requestPasswordReset = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email }: PasswordResetRequestInput = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found with this email.',
      });
      return;
    }

    // Generate reset code
    const resetCode = generateResetCode();

    await PasswordReset.deleteMany({ userId: user._id });

    const passwordReset = new PasswordReset({
      userId: user._id,
      email: user.email,
      resetCode,
    });

    await passwordReset.save();

    await sendPasswordResetEmail(user.email, resetCode, user.username);

    res.status(200).json({
      success: true,
      message: 'Password reset email sent successfully.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Error resetting user password',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const confirmPasswordReset = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, resetCode, newPassword } = req.body;

    const passwordResetRecord = await PasswordReset.findOne({
      email,
      resetCode,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    });

    if (!passwordResetRecord) {
      res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset token.',
      });
      return;
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user password
    await User.findByIdAndUpdate(passwordResetRecord.userId, {
      password: hashedPassword,
    });

    // Mark reset code as used
    passwordResetRecord.isUsed = true;
    await passwordResetRecord.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error confirming password reset',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
