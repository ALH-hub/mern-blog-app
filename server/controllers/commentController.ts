// Defining comment controllers

import { Request, Response } from 'express';
import Comment from '../models/commentSchema.js';
import BlogPost from '../models/blogPostSchema.js';
import mongoose from 'mongoose';
import { CommentCreateInput } from '../schemas/comment.validation.js';

export const createComment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const postId: string = req.params.postId;
    const postCreateData: CommentCreateInput = req.body;
    const userId: string = (req as any).user?.userId;

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
    if (postCreateData.parentCommentId) {
      parentComment = await Comment.findById(postCreateData.parentCommentId);
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
      content: postCreateData.content,
      author: userId,
      post: postId,
      parentComment: postCreateData.parentCommentId || null,
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
    const postId: string = req.params.postId;
    const page: number = req.query.page ? Number(req.query.page) : 1;
    const limit: number = req.query.limit ? Number(req.query.limit) : 10;

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

export const updateComment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { postId, commentId } = req.params as {
      postId: string;
      commentId?: string;
    };
    const { content }: { content: string } = req.body;
    const userId: string = (req as any).user.userId;

    const updatedComment = await Comment.findOneAndUpdate(
      { _id: commentId, post: postId, author: userId },
      { content, updatedAt: new Date() },
      { new: true, runValidators: true },
    );

    if (!updatedComment) {
      res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      data: updatedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed updating comment',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { postId, commentId } = req.params as {
      postId: string;
      commentId?: string;
    };
    const userId: string = (req as any).user?.userId;
    const userRole: string = (req as any).user?.role;

    const query: any = {
      _id: commentId,
      post: postId,
    };

    if (userRole !== 'admin') {
      query.author = userId;
    }

    const updatedComment = await Comment.findOneAndUpdate(
      query,
      {
        isDeleted: true,
        content: '[Comment deleted]',
      },
      {
        new: true,
      },
    );

    if (!updatedComment) {
      res.status(404).json({
        success: false,
        message: 'Comment not found or unauthorized',
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed deleting comment',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
