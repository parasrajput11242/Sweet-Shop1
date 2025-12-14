import express from "express";
import {
  getSweets,
  addSweet,
  updateSweet,
  deleteSweet,
  purchaseSweet,
} from "../controllers/sweet.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/", getSweets);
router.post("/", protect, adminOnly, addSweet);
router.put("/:id", protect, adminOnly, updateSweet);
router.delete("/:id", protect, adminOnly, deleteSweet);
router.post("/:id/purchase", protect, purchaseSweet);

export default router;