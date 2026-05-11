import express from "express";
import { protect } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/adminMiddleware";
import {
  getPendingProperties,
  approveProperty,
  rejectProperty,
  getAllProperties,
} from "../controllers/property.controller";

const router = express.Router();
router.get("/properties/pending", protect, isAdmin, getPendingProperties);
router.get("/properties", protect, isAdmin, getAllProperties);
router.patch("/properties/:id/approve", protect, isAdmin, approveProperty);
router.patch("/properties/:id/reject", protect, isAdmin, rejectProperty);

export default router;
