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

// Post-save middleware to add comment ID to post
commentSchema.post('save', async function (doc) {
  try {
    if (this.isNew) {
      await mongoose.model('BlogPost').findByIdAndUpdate(doc.post, {
        $addToSet: { comments: doc._id },
        $inc: { commentCount: 1 },
      });
    }
  } catch (error) {
    console.error(
      'Error updating post comments, from post save middleware:',
      error,
    );
  }
});

// Post-remove middleware to remove comment ID from post
commentSchema.post('findOneAndDelete', async function (doc) {
  try {
    if (doc) {
      await mongoose.model('BlogPost').findByIdAndDelete(doc.post, {
        $pull: { comments: doc._id },
        $inc: { commentCount: -1 },
      });
    }
  } catch (error) {
    console.error(
      'Error updating post comments, from post findOneAndDelete middleware:',
      error,
    );
  }
});

// Post-update to handle soft deletes (when isDeleted is set to true)
commentSchema.post('findOneAndUpdate', async function (doc) {
  try {
    if (doc && doc.isDeleted) {
      mongoose
        .model('BlogPost')
        .findByIdAndUpdate(doc.post, { $inc: { commentCount: -1 } });
    }
  } catch (error) {
    console.error('Error handling soft delete:', error);
  }
});
export default mongoose.model<IComment>('Comment', commentSchema);
