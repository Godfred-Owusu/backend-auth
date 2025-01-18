import express from "express";
const router = express.Router();

import {
  deleteUser,
  editUser,
  forgotPassword,
  getAllUsers,
  loginUser,
  logout,
  resetPassword,
  signUpUser,
  verifyEmail,
  checkAuth,
  resendCode,
} from "../controllers/userCtl.js";
import { verifyToken } from "../middleware/verifyToken.js";
router.get("/check-auth", verifyToken, checkAuth);
router.get("/users", getAllUsers);
router.post("/users", signUpUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-code", resendCode);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
router.post("/logout", logout);
router.put("/editUser/:id", editUser);
router.delete("/delete/:id", deleteUser);

export default router;
