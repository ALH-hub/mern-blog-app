// BlogPost Schema definition

import mongoose from 'mongoose';

enum Category {
  Technology = 'Technology',
  Health = 'Health',
  Lifestyle = 'Lifestyle',
  Business = 'Business',
  Travel = 'Travel',
  Food = 'Food',
  Education = 'Education',
}

interface IBlogPost extends mongoose.Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  coverImage?: string;
  category: Category;
  readingTime: number;
  likes: number;
  views: number;
  comments: mongoose.Types.ObjectId[];
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    coverImage: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      enum: Object.values(Category),
      required: true,
    },
    readingTime: { type: Number, required: true, default: 1 },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    commentCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

// Middleware: After saving a blog post, add it to user's posts array
BlogPostSchema.post('save', async function (doc) {
  try {
    await mongoose.model('User').findByIdAndUpdate(
      doc.author,
      { $addToSet: { posts: doc._id } }, // $addToSet prevents duplicates
      { new: true },
    );
  } catch (error) {
    console.error('Error updating user posts array:', error);
  }
});

// Middleware: After deleting a blog post, remove it from user's posts array
BlogPostSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    try {
      await mongoose
        .model('User')
        .findByIdAndUpdate(
          doc.author,
          { $pull: { posts: doc._id } },
          { new: true },
        );
    } catch (error) {
      console.error('Error removing post from user posts array:', error);
    }
  }
});

// Middleware: Handle multiple deletes (like deleteMany)
BlogPostSchema.post('deleteMany', async function () {
  try {
    // Remove all post references from users
    await mongoose
      .model('User')
      .updateMany({}, { $pull: { posts: { $in: this.getFilter()._id } } });
  } catch (error) {
    console.error('Error cleaning up user posts after bulk delete:', error);
  }
});

BlogPostSchema.virtual('totalComments').get(function () {
  return this.comments?.length || 0;
});

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
