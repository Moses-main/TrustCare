import crypto from "crypto";
import User from "../models/User.js";
import Patient from "../models/Patient.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { name, email, password, role, walletAddress } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false,
        message: "Email already in use" 
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      walletAddress,
      isEmailVerified: true
    });

    if (role === "patient") {
      await Patient.create({
        walletAddress,
        fullName: name,
        contactInfo: { email },
      });
    }

    const token = generateToken(user._id);
    
    res.status(201).json({ 
      success: true,
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: true
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    const token = generateToken(user._id);
    
    user.lastLogin = Date.now();
    user.loginAttempts = 0;
    await user.save({ validateBeforeSave: false });

    res.json({ 
      success: true,
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      } 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'An error occurred during login' 
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No user found" });

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;
    console.log(`Password reset link: ${resetURL}`);

    res.status(200).json({ message: "Reset link sent (check logs)", resetURL });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

export const getMe = (req, res) => {
  const { _id, name, email, role, isEmailVerified } = req.user;
  res.status(200).json({
    success: true,
    user: {
      id: _id,
      name,
      email,
      role,
      isEmailVerified
    }
  });
};

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
