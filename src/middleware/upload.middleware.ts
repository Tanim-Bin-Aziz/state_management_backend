import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

// Single image storage (plot photo)
const singleStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "properties/plots",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  } as object,
});

// Flat plan storage (max 2 images)
const flatPlanStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "properties/flat-plans",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  } as object,
});

export const uploadPlotPhoto = multer({ storage: singleStorage }).single(
  "plotPhoto",
);

export const uploadFlatPlans = multer({ storage: flatPlanStorage }).array(
  "flatPlanImages",
  2,
); // max 2

// Combined: both in one request
export const uploadPropertyImages = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: (_req: Express.Request, file: Express.Multer.File) => ({
      folder:
        file.fieldname === "plotPhoto"
          ? "properties/plots"
          : "properties/flat-plans",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
    }),
  }),
}).fields([
  { name: "plotPhoto", maxCount: 1 },
  { name: "flatPlanImages", maxCount: 2 },
]);
