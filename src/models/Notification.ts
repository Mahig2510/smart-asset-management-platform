import mongoose, {
  Schema,
  Document,
  Model,
} from "mongoose";

export interface INotification
  extends Document {
  user: mongoose.Types.ObjectId;

  title: string;

  message: string;

  isRead: boolean;

  createdAt: Date;
}

const NotificationSchema =
  new Schema<INotification>(
    {
      user: {
        type:
          Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },

      isRead: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

const Notification:
  Model<INotification> =
  mongoose.models.Notification ||
  mongoose.model(
    "Notification",
    NotificationSchema
  );

export default Notification;