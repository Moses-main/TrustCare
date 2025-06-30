import crypto from "crypto";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

// REGISTER
export const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already in use" });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No user found" });

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Simulate sending email (log it)
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/reset-password/${resetToken}`;
    console.log(`Password reset link: ${resetURL}`);

    res.status(200).json({ message: "Reset link sent (check logs)", resetURL });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: "Token is invalid or expired" });

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const token = generateToken(user._id);
  res.status(200).json({ token, user });
};

// GET ME (Authenticated user info)
export const getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};

// UPDATE PASSWORD (while logged in)
export const updatePassword = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return res.status(401).json({ message: "Current password is wrong" });
  }

  user.password = req.body.newPassword;
  await user.save();

  const token = generateToken(user._id);
  res.status(200).json({ token, user });
};
