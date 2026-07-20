import express from "express";
import User from "../models/userModel.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protectRoute, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select("fullname email faculty level profilePic isVerified")
      .sort({ fullname: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Could not load users" });
  }
});

export default router;
