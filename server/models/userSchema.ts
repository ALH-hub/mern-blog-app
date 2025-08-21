// User Schema definition

import mongoose from 'mongoose';

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  posts: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => email.includes('@'),
      message: 'Invalid email format',
    },
  },
  password: { type: String, required: true },
  posts: [{ type: mongoose.Types.ObjectId, ref: 'BlogPost' }],
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

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

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
