// Password reset request schema

import mongoose from 'mongoose';

interface IPasswordReset {
  userId: mongoose.Schema.Types.ObjectId;
  resetCode: string;
  email: string;
  expiresAt: Date;
  isUsed: boolean;
}

const passwordResetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    resetCode: { type: String, required: true },
    email: { type: String, required: true },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 15 * 60 * 1000),
    }, // 15 minutes expiration
    isUsed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Auto remove expired reset codes

export default mongoose.model<IPasswordReset>(
  'PasswordReset',
  passwordResetSchema,
);
