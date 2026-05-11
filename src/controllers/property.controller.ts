import { Request, Response } from "express";
import Property from "../models/property.model";

export const getProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find({ status: "approved" });

    res.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error("getProperties error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPendingProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find({ status: "pending" }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error("pending error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.json({ success: true, data: property });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Invalid ID or server error",
    });
  }
};

export const createProperty = async (req: Request, res: Response) => {
  try {
    const files = req.files as {
      plotPhoto?: Express.Multer.File[];
      flatPlanImages?: Express.Multer.File[];
    };

    // Get uploaded image URLs from Cloudinary
    const plotPhotoUrl = files?.plotPhoto?.[0]?.path ?? "";
    const flatPlanUrls = (files?.flatPlanImages ?? []).map((file, index) => ({
      name: req.body[`flatPlanName_${index}`] ?? `Plan ${index + 1}`,
      image: file.path, // Cloudinary URL
    }));

    // Parse flatSize from body
    const flatSizeRaw = req.body.flatSize;
    const flatSize = Array.isArray(flatSizeRaw)
      ? flatSizeRaw.map((item: string) => JSON.parse(item))
      : flatSizeRaw
        ? [JSON.parse(flatSizeRaw)]
        : [];

    const property = await Property.create({
      id: Date.now(),
      title: req.body.title,
      lat: Number(req.body.lat),
      lng: Number(req.body.lng),
      status: "pending",
      plotDetails: {
        plotOwnerName: req.body.plotOwnerName,
        plotSize: req.body.plotSize,
        address: req.body.address,
        plotPhoto: plotPhotoUrl,
      },
      flatDetails: {
        flatSize,
        pricePerSqFt: Number(req.body.pricePerSqFt),
        flatPlan: flatPlanUrls,
      },
      salesInformation: {
        totalFlats: Number(req.body.totalFlats),
        soldFlats: Number(req.body.soldFlats),
      },
    });

    res.status(201).json({ success: true, data: property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const approveProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    property.status = "approved";
    await property.save();

    res.json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const rejectProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    property.status = "rejected";
    await property.save();

    res.json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error("reject error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.json({ success: true, message: "Property deleted" });
  } catch (error) {
    console.error("delete error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProperty = async (req: Request, res: Response) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.json({ success: true, data: property });
  } catch (error) {
    console.error("update error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
