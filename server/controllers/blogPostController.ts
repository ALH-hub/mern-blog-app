// Defining Blog Post Controllers

import { Request, Response } from 'express';
import BlogPost from '../models/blogPostSchema.js';
import User from '../models/userSchema.js';
import { BlogPostCreateInput, objectIdSchema } from '../schemas/validation.js';

export const createPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // At this point, req.body is already validated by Zod middleware
    const { title, content }: BlogPostCreateInput = req.body;

    const { userId } = (req as any).user;

    const verifiedAuthor = objectIdSchema.safeParse(userId);
    if (verifiedAuthor.error) {
      res.status(400).json({
        success: false,
        message: 'Author verification id Failed',
        error: verifiedAuthor.error.message,
      });
    }

    const existingUser = await User.findOne({ _id: userId });
    if (!existingUser) {
      res.status(400).json({
        success: false,
        message: 'Author not found among Users',
      });
    }
    // Create new Blog post
    const newPost = new BlogPost({
      title,
      content,
      author: userId,
    });

    const savedPost = await newPost.save();

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: savedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating Blog Post',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ath this point, req.params.id is already validated by Zod middleware
    const { id } = req.params;

    const post = await BlogPost.findById(id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving post',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Fetch all the posts
    const posts = await BlogPost.find().populate('author', 'username email');
    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving posts',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Both params and body are validated by Zod middleware
    const { id } = req.params;
    const updateData = req.body;

    const verifiedAuthor = objectIdSchema.safeParse((req as any).user.userId);
    if (verifiedAuthor.error) {
      res.status(400).json({
        success: false,
        message: 'Author verification failed',
        error: verifiedAuthor.error.message,
      });
      return;
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true },
    );

    if (!updatedPost) {
      res.status(500).json({
        success: false,
        message: 'Post not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating post',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deletePost = async (
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

    const deletedPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedPost) {
      res.status(404).json({
        success: false,
        message: 'Post not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
      data: { title: deletedPost.title },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting post',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
