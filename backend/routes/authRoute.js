import express from "express";
import {
  forgotPassword,
  getUserProfile,
  loginUser,
  logoutUser,
  refresh_token,
  registerUser,
  resendVerification,
  resetPassword,
  verifyEmail,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protectRoute, logoutUser);
router.post("/refresh-token", refresh_token);
router.get("/profile", protectRoute, getUserProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerification);

export default router;
