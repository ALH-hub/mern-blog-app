// Defining comment controllers

import { Request, Response } from 'express';
import Comment from '../models/commentSchema';
import BlogPost from '../models/blogPostSchema';
import mongoose from 'mongoose';

export const createComment = async (
  req: Request,
  res: Response,
): Promise<void> => {
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

    // Check if the comment created is a reply
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

    // Create the comment
    const comment = new Comment({
      content,
      author: userId,
      post: postId,
      parentComment: parentCommentId || null,
      depth,
    });

    await comment.save();

    // Add the comment id to its parent if exist any
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

export const getPostComments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const post = await BlogPost.findById(postId);
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Post not found',
      });
      return;
    }

    // Fetch top level comments with no parents
    const topLevelComments = await Comment.find({
      post: postId,
      parentComment: null,
      isDeleted: false,
    })
      .populate('author', 'username, email')
      .sort({ createdAt: -1 })
      .limit(Number(limit) * Number(page))
      .skip((Number(page) - 1) * Number(limit));

    // Populate the the replies of comments
    const populateReplies = async (comments: any[]): Promise<any[]> => {
      for (const comment of comments) {
        const replies = await Comment.find({
          parentComment: comment._id,
          isDeleted: false,
        })
          .populate('author', 'username, email')
          .sort({ createdAt: 1 });

        comment.replies = await populateReplies(replies);
      }
      return comments;
    };

    const commentsWithReplies = await populateReplies(topLevelComments);

    const totalComments = await Comment.countDocuments({
      post: postId,
      parentComment: null,
      isDeleted: false,
    });

    // Preparing response data
    res.status(200).json({
      success: true,
      message: 'Comments retrieved successfully',
      data: commentsWithReplies,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalComments,
        pages: Math.ceil(totalComments / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching Post comments',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
