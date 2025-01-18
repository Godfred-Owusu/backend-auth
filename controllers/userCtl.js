import User from "../models/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetPasswordSuccessEmail,
  sendVerificationEmail,
} from "../mailtrap/emails.js";

/**
 * Retrieves all users from the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 * @throws {Error} - If there is an error retrieving users.
 */

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res
      .status(200)
      .json({ success: true, message: "Users retrieved successfully", users });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      error: err.message,
    });
  }
};

// Sign In User
export const signUpUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashPassword, // Store hashed password
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    // Save the user to the database
    await newUser.save();

    // jwt token
    generateTokenAndSetCookie(res, newUser._id);

    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.statuts(400).json({
        success: false,
        message: "User doesn't exit",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "User logged In",
      data: { email, password },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

// edit user
export const editUser = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from request params
    const updateUser = req.body; // Get the update data from request body

    // Update user directly
    const updatedUser = await User.findByIdAndUpdate(id, updateUser, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is applied to the updated data
    });

    // If the user is not found
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    // If the update is successful
    res.status(200).json({
      success: true,
      message: "Edited successfully",
      data: updatedUser, // Include the updated user data in the response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete the user
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: { id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: new Date() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * Resends the verification code to the user's email.
 *
 * This function handles the process of resending a verification code to a user's email address.
 * It first checks if the user exists in the database and if the user's email is already verified.
 * If the user exists and the email is not verified, it generates a new verification code,
 * updates the user's verification token and its expiration time, saves the user, and sends the new verification code via email.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.email - The email of the user to resend the verification code to.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 * @throws {Error} - If there is an error during the process, it sends a 500 status code with an error message.
 */
export const resendCode = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ); // 24 hours

    await user.save();

    await sendVerificationEmail(user.email, verificationToken);

    res.status(200).json({
      success: true,
      message: "Verification code resent successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

// forget password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 20 * 60 * 1000; // 20 minutes

    await user.save();
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token or token expired",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    try {
      await sendResetPasswordSuccessEmail(user.email, user.name);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server Email error",
        error: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
