// Comment Schema definition

import mongoose from 'mongoose';

interface IComment extends mongoose.Document {
  content: string;
  author: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  parentComment?: mongoose.Types.ObjectId;
  replies: mongoose.Types.ObjectId[];
  depth: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1000,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogPost',
      required: true,
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    depth: {
      type: Number,
      default: 0,
      max: 5,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

commentSchema.index({ post: 1, parentComment: 1 });
commentSchema.index({ author: 1 });
commentSchema.index({ createdAt: -1 });

export default mongoose.model<IComment>('Comment', commentSchema);
