// Defining User controllers
import { Request, Response } from 'express';
import User from '../models/userSchema.js';
import { objectIdSchema, UserUpdateInput } from '../schemas/validation.js';

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

    const verifiedAuthor = objectIdSchema.safeParse((req as any).user.userId);
    if (verifiedAuthor.error) {
      res.status(400).json({
        success: false,
        message: 'Author verification failed',
        error: verifiedAuthor.error.message,
      });
      return;
    }

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

    const verifiedAuthor = objectIdSchema.safeParse((req as any).user.userId);
    if (verifiedAuthor.error) {
      res.status(400).json({
        success: false,
        message: 'Author verification failed',
        error: verifiedAuthor.error.message,
      });
      return;
    }

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
