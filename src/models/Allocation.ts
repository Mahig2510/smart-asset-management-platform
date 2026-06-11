import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

export type AllocationStatus =
  | "ACTIVE"
  | "RETURNED"
  | "OVERDUE";

export interface IAllocation
  extends Document {
  user: mongoose.Types.ObjectId;

  asset: mongoose.Types.ObjectId;

  request: mongoose.Types.ObjectId;

  quantity: number;

  issueDate: Date;

  dueDate: Date;

  returnDate?: Date;

  status: AllocationStatus;

  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

const AllocationSchema =
  new Schema<IAllocation>(
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

      request: {
        type: Schema.Types.ObjectId,
        ref: "Request",
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
        min: 1,
      },

      issueDate: {
        type: Date,
        required: true,
      },

      dueDate: {
        type: Date,
        required: true,
      },

      returnDate: {
        type: Date,
      },

      status: {
        type: String,
        enum: [
          "ACTIVE",
          "RETURNED",
          "OVERDUE",
        ],
        default: "ACTIVE",
      },

      notes: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

const Allocation: Model<IAllocation> =
  mongoose.models.Allocation ||
  mongoose.model<IAllocation>(
    "Allocation",
    AllocationSchema
  );

export default Allocation;