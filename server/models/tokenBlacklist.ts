import mongoose from 'mongoose';
import { ref } from 'process';
import { string } from 'zod';

interface ITokenBlacklist extends mongoose.Document {
  token: string;
  userId: mongoose.Schema.Types.ObjectId;
  expiresAt: Date;
}

const tokenBlacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

// Auto remove expired tokens
tokenBlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<ITokenBlacklist>(
  'TokenBlacklist',
  tokenBlacklistSchema,
);
