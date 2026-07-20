import express from "express";
import { getConversations, getMessages, sendMessage } from "../controllers/messageController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/conversations", protectRoute, getConversations);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/:id", protectRoute, getMessages);

export default router;
