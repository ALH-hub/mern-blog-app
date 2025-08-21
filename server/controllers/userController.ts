// Defining User controllers

import { Request, Response } from 'express';
import User from '../models/userSchema';
import { hashPassword } from '../utils/helpers';
import { UserCreateInput, UserUpdateInput } from '../schemas/validation';

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // At this point, req.body is already validated by Zod middleware
    const { username, email, password }: UserCreateInput = req.body;

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

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Remove password from response
    const userResponse = {
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      posts: savedUser.posts,
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

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // At this point, req.params.id is already validated by Zod middleware
    const { id } = req.params;

    const user = await User.findById(id).select('-password').populate('posts');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('posts', 'title createdAt');

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving users',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Both params and body are validated by Zod middleware
    const { id } = req.params;
    const updateData: UserUpdateInput = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true },
    ).select('-password');

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // req.params.id is validated by Zod middleware
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: { username: deletedUser.username },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
