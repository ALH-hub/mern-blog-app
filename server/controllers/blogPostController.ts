// Defining Blog Post Controllers

import { Request, Response } from 'express';
import BlogPost from '../models/blogPostSchema';
import User from '../models/userSchema';
import { BlogPostCreateInput, objectIdSchema } from '../schemas/validation';

export const createPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // At this point, req.body is already validated by Zod middleware
    const { title, content, author }: BlogPostCreateInput = req.body;

    const verifiedAuthor = objectIdSchema.safeParse(author);
    if (verifiedAuthor.error) {
      res.status(400).json({
        success: false,
        message: 'Author verification id Failed',
        error: verifiedAuthor.error.message,
      });
    }

    const existingUser = await User.findOne({ _id: author });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'Author not found among Users',
      });
    }
    // Create new Blog post
    const newPost = new BlogPost({
      title,
      content,
      author,
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
