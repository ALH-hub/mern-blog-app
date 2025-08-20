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
  password: { type: String, required: true},
  posts: [{ type: mongoose.Types.ObjectId, ref: 'BlogPost' }],
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
