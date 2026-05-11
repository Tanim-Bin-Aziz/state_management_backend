import express from "express";
import {
  getProperties,
  getPropertyById,
  createProperty,
  deleteProperty,
  updateProperty,
  getPendingProperties,
} from "../controllers/property.controller";
import { protect } from "../middleware/auth.middleware";
import { uploadPropertyImages } from "../middleware/upload.middleware";
import { isAdmin } from "../middleware/adminMiddleware";

const router = express.Router();
router.get("/", getProperties);
router.get("/pending", getPendingProperties);
router.post("/", protect, uploadPropertyImages, createProperty);
router.delete("/:id", protect, isAdmin, deleteProperty);
router.patch("/:id", protect, isAdmin, updateProperty);
router.get("/:id", getPropertyById);

export default router;
