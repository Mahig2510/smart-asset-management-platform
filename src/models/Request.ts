import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

export type RequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "RETURNED";

export interface IRequest
  extends Document {
  user: mongoose.Types.ObjectId;

  asset: mongoose.Types.ObjectId;

  quantity: number;

  startDate: Date;

  endDate: Date;

  purpose: string;

  status: RequestStatus;

  approvedBy?: mongoose.Types.ObjectId;

  approvedAt?: Date;

  rejectionReason?: string;

  createdAt: Date;
  updatedAt: Date;
}

const RequestSchema =
  new Schema<IRequest>(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      asset: {
        type: Schema.Types.ObjectId,
        ref: "Asset",
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
        min: 1,
      },

      startDate: {
        type: Date,
        required: true,
      },

      endDate: {
        type: Date,
        required: true,
      },

      purpose: {
        type: String,
        required: true,
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "APPROVED",
          "REJECTED",
          "RETURNED",
        ],
        default: "PENDING",
      },

      approvedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      approvedAt: {
        type: Date,
      },

      rejectionReason: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

const Request: Model<IRequest> =
  mongoose.models.Request ||
  mongoose.model<IRequest>(
    "Request",
    RequestSchema
  );

export default Request;