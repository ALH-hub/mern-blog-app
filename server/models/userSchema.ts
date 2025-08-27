// User Schema definition

import mongoose from 'mongoose';
import { email, lowercase, object, string } from 'zod';

// enum of roles
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  posts: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    validate: {
      validator: (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: 'Invalid email format',
    },
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: Object.values(UserRole), // ['admin', 'user']
    default: UserRole.USER,
    required: true,
  },
  posts: [{ type: mongoose.Types.ObjectId, ref: 'BlogPost' }],
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.index({ username: 1 });
UserSchema.index({ role: 1 });

// Middleware: When a user is deleted, delete all their blog posts
UserSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    try {
      await mongoose.model('BlogPost').deleteMany({ author: doc._id });
      console.log(`Deleted all posts for user ${doc.username}`);
    } catch (error) {
      console.error('Error deleting user posts:', error);
    }
  }
});

// Middleware: Handle bulk user deletions
UserSchema.post('deleteMany', async function () {
  try {
    const userIds = this.getFilter()._id;
    await mongoose.model('BlogPost').deleteMany({
      author: { $in: Array.isArray(userIds) ? userIds : [userIds] },
    });
  } catch (error) {
    console.error('Error deleting posts after bulk user delete:', error);
  }
});

export { UserRole };
export default mongoose.model<IUser>('User', UserSchema);
