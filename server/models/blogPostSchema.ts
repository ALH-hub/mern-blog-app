// BlogPost Schema definition

import mongoose from 'mongoose';

interface IBlogPost extends mongoose.Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

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

const BlogPost = mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
