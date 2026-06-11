import mongoose, { Schema, Document, Model } from "mongoose";

export type AssetStatus =
  | "AVAILABLE"
  | "ALLOCATED"
  | "MAINTENANCE"
  | "RETIRED"
  | "LOST";

export type AssetCondition =
  | "NEW"
  | "GOOD"
  | "FAIR"
  | "DAMAGED";

export interface IAsset extends Document {
  assetId: string;
  name: string;
  description?: string;

  category: mongoose.Types.ObjectId;
  totalQuantity: number;
  availableQuantity: number;

  serialNumber?: string;

  purchaseDate?: Date;
  purchaseCost?: number;

  location?: string;

  status: AssetStatus;

  condition: AssetCondition;
  maintenanceNotes?: string;

  assignedTo?: mongoose.Types.ObjectId;

  qrCode?: string;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const AssetSchema = new Schema<IAsset>(
  {
    assetId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    totalQuantity: {
      type: Number,
      required: true,
      default: 1,
      min: 0,
    },

    availableQuantity: {
      type: Number,
      required: true,
      default: 1,
      min: 0,
    },

    serialNumber: {
      type: String,
      default: "",
      trim: true,
    },

    purchaseDate: {
      type: Date,
    },

    purchaseCost: {
      type: Number,
      default: 0,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "AVAILABLE",
        "ALLOCATED",
        "MAINTENANCE",
        "RETIRED",
        "LOST",
      ],
      default: "AVAILABLE",
    },

    condition: {
      type: String,
      enum: [
        "NEW",
        "GOOD",
        "FAIR",
        "DAMAGED",
      ],
      default: "NEW",
    },

    maintenanceNotes: {
      type: String,
      default: "",
      trim: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    qrCode: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Asset: Model<IAsset> =
  mongoose.models.Asset ||
  mongoose.model<IAsset>("Asset", AssetSchema);

export default Asset;