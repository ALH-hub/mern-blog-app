// Defining Blog Post Controllers

import { Request, Response } from 'express';
import BlogPost from '../models/blogPostSchema.js';
import User from '../models/userSchema.js';
import {
  BlogPostCreateInput,
  BlogPostUpdateInput,
} from '../schemas/post.validation.js';

export const createPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // At this point, req.body is already validated by Zod middleware
    const { title, content, coverImage, category }: BlogPostCreateInput =
      req.body;
    const userId: string = (req as any).user.userId;

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
      coverImage,
      category,
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
    const id: string = req.params.id;

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
    const queries: any = {};
    const { category, search, sort, author } = req.query;

    console.log(req.query);

    if (category && category !== 'All') {
      queries.category = category;
    }

    if (search) {
      queries.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }
    if (author) {
      queries.author = author;
    }

    let sortOption: any = { createdAt: -1 }; // Default to newest first
    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (sort === 'title') {
      sortOption = { title: 1 };
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const queriedPosts = await BlogPost.find(queries)
      .populate('author', 'username email')
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalPosts = await BlogPost.countDocuments(queries);
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      success: true,
      data: queriedPosts,
      meta: {
        totalPosts,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
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
    const id: string = req.params.id;
    const updateData: BlogPostUpdateInput = req.body;

    const updatedPost = await BlogPost.findOneAndUpdate(
      { _id: id, author: (req as any).user.userId },
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true },
    );

    if (!updatedPost) {
      res.status(404).json({
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
    const id: string = req.params.id;
    const { userId, role }: { userId: string; role: string } = (req as any)
      .user;

    const query: any = {
      _id: id,
    };

    if (role !== 'admin') {
      query.author = userId;
    }
    const deletedPost = await BlogPost.findOneAndDelete(query);

    if (!deletedPost) {
      res.status(404).json({
        success: false,
        message: 'Post not found or unauthorized',
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
