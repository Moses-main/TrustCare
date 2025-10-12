import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
  },
  // ✅ ADD THIS
  role: {
    type: String,
    enum: ["patient", "provider", "admin"],
    default: "patient",
  },
  password: { type: String, required: true, minlength: 6 },
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: { type: String },
  emailVerificationExpires: { type: Date },
  isEmailVerified: { type: Boolean, default: false },
  lastLogin: { type: Date },
  loginAttempts: { type: Number, default: 0 },
  accountLocked: { type: Boolean, default: false },
  accountLockedUntil: { type: Date },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.correctPassword = async function (candidate, original) {
  return await bcrypt.compare(candidate, original);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 mins
  return resetToken;
};

// Generate email verification token
userSchema.methods.generateEmailVerificationToken = function() {
  const verificationToken = uuidv4();
  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');
  this.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  return verificationToken;
};

// Check if email verification token is valid
userSchema.methods.isVerificationTokenValid = function(token) {
  const hashedToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');

  return (
    hashedToken === this.emailVerificationToken &&
    this.emailVerificationExpires > Date.now()
  );
};

export default mongoose.model("User", userSchema);
