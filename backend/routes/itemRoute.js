import express from "express";
import { createItem, getItems } from "../controllers/itemController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();
router.get("/", getItems);
router.post("/", protectRoute, createItem);

export default router;
