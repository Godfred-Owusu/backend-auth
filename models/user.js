import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId; // Password is required only if Google ID is not set
      },
    },
    googleId: { type: String, default: null },
    profilePicture: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    verificationToken: { type: String, default: null },
    verificationTokenExpiresAt: { type: Date, default: null },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const User = mongoose.model("user", userSchema);

export default User;
