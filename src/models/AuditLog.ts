import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

export interface IAuditLog
  extends Document {
  user?: mongoose.Types.ObjectId;

  action: string;

  description: string;

  createdAt: Date;
}

const AuditLogSchema =
  new Schema<IAuditLog>(
    {
      user: {
        type:
          Schema.Types.ObjectId,
        ref: "User",
      },

      action: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog ||
  mongoose.model<IAuditLog>(
    "AuditLog",
    AuditLogSchema
  );

export default AuditLog;