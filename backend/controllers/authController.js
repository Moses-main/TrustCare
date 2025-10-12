import crypto from "crypto";
import User from "../models/User.js";
import Patient from "../models/Patient.js";
import { generateToken } from "../utils/generateToken.js";
import EmailService from "../services/email/email.service.js";
import { config } from "../config/config.js";
const { FRONTEND_URL } = config;

// // REGISTER
// export const signup = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists)
//       return res.status(400).json({ message: "Email already in use" });

//     const user = await User.create({ name, email, password, role });
//     const token = generateToken(user._id);
//     res.status(201).json({ token, user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const signup = async (req, res) => {
  const { name, email, password, role, walletAddress } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false,
        message: "Email already in use" 
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      walletAddress,
    });

    // Generate email verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    // Create verification URL
    const verificationUrl = `${FRONTEND_URL}/verify-email/${verificationToken}`;

    // Send verification email
    try {
      await new EmailService(user, verificationUrl).sendVerification();
    } catch (error) {
      // If email sending fails, still return success but log the error
      console.error('Error sending verification email:', error);
      // Continue with user creation even if email sending fails
    }

    // Create Patient profile if role is patient
    if (role === "patient") {
      await Patient.create({
        walletAddress,
        fullName: name,
        contactInfo: { email },
      });
    }

    // Generate token but don't log in yet
    const token = generateToken(user._id);
    
    res.status(201).json({ 
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
      requiresVerification: true,
      token // Still return token for immediate login if needed
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// // LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1) Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // 2) Check if email is verified
    if (!user.isEmailVerified) {
      // Generate new verification token if expired
      if (!user.emailVerificationToken || user.emailVerificationExpires < Date.now()) {
        const verificationToken = user.generateEmailVerificationToken();
        await user.save({ validateBeforeSave: false });
        
        const verificationUrl = `${FRONTEND_URL}/verify-email/${verificationToken}`;
        await new EmailService(user, verificationUrl).sendVerification();
      }
      
      return res.status(403).json({
        success: false,
        requiresVerification: true,
        message: 'Please verify your email address. A new verification email has been sent.'
      });
    }

    // 3) If everything is OK, generate token and send response
    const token = generateToken(user._id);
    
    // Update last login timestamp
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

/**
 * @desc    Verify user's email
 * @route   GET /api/v1/auth/verify-email/:token
 * @access  Public
 */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verification token is required'
      });
    }

    // Find user by verification token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Token is invalid or has expired'
      });
    }

    // Update user
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save({ validateBeforeSave: false });

    // Generate token for automatic login
    const authToken = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      token: authToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during email verification'
    });
  }
};

/**
 * @desc    Resend verification email
 * @route   POST /api/v1/auth/resend-verification
 * @access  Public
 */
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email'
      });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }

    // Generate new verification token
    const verificationToken = user.generateEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    // Create verification URL
    const verificationUrl = `${FRONTEND_URL}/verify-email/${verificationToken}`;

    // Send verification email
    await new EmailService(user, verificationUrl).sendVerification();

    res.status(200).json({
      success: true,
      message: 'Verification email sent successfully'
    });
  } catch (error) {
    console.error('Resend verification email error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while sending verification email'
    });
  }
};

// GET ME (Authenticated user info)
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
