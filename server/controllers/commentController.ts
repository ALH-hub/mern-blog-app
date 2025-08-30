// Defining comment controllers

import { Request, Response } from 'express';
import Comment from '../models/commentSchema';
import BlogPost from '../models/blogPostSchema';
import { date, success } from 'zod';
import mongoose from 'mongoose';

export const createComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { content, parentCommentId } = req.body;
    const userId = (req as any).user?.userId;

    const post = await BlogPost.findById(postId);
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found',
      });
      return;
    }

    let depth = 0;
    let parentComment = null;

    if (parentCommentId) {
      parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) {
        res.status(404).json({
          success: false,
          message: 'Parent comment not found, verify again please',
        });
        return;
      }

      if (parentComment.post.toString() !== postId) {
        res.status(400).json({
          success: false,
          message: 'Parent comment does not belong to this post',
        });
        return;
      }

      depth = parentComment.depth + 1;
      if (depth > 5) {
        res.status(400).json({
          success: false,
          message: 'Maximum nesting depth has been reached',
        });
        return;
      }
    }

    const comment = new Comment({
      content,
      author: userId,
      post: postId,
      parentComment: parentCommentId || null,
      depth,
    });

    await comment.save();

    if (parentComment) {
      parentComment.replies.push(comment._id as mongoose.Types.ObjectId);
      await parentComment.save();
    }

    await comment.populate('author', 'username email');

    res.status(201).json({
      success: true,
      message: 'Comment created successfully',
      date: comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating comment',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
