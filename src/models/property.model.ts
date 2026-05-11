import mongoose from "mongoose";

const plotDetailsSchema = new mongoose.Schema({
  plotOwnerName: { type: String, required: true },
  plotSize: { type: String, required: true },
  address: { type: String, required: true },
  plotPhoto: { type: String, required: true },
});

const flatSizeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  size: { type: String, required: true },
});

const flatPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

const flatDetailsSchema = new mongoose.Schema({
  flatSize: [flatSizeSchema],
  pricePerSqFt: { type: Number, required: true },
  flatPlan: [flatPlanSchema],
});

const salesInfoSchema = new mongoose.Schema({
  totalFlats: { type: Number, required: true },
  soldFlats: { type: Number, required: true },
});

const propertySchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },

    title: { type: String, required: true },

    lat: { type: Number, required: true },
    lng: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    plotDetails: plotDetailsSchema,

    flatDetails: flatDetailsSchema,

    salesInformation: salesInfoSchema,
  },
  { timestamps: true },
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
