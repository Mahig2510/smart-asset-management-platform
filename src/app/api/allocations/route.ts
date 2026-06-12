import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import { connectDB } from "@/lib/db/connect";

import Allocation from "@/models/Allocation";
import User from "@/models/User";
import Asset from "@/models/Asset";
import RequestModel from "@/models/Request";
import Notification from "@/models/Notification";

console.log("User import:", User);
console.log("Request import:", RequestModel);

export async function GET() {
  try {
    await connectDB();

    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    let allocations;

    if (
      currentUser.role === "ADMIN"
    ) {
      allocations =
        await Allocation.find()
          .populate("asset")
          .populate("user")
          .sort({
            createdAt: -1,
          });
    } else {
      allocations =
        await Allocation.find({
          user:
            currentUser.userId,
        })
          .populate("asset")
          .populate("user")
          .sort({
            createdAt: -1,
          });
    }

    // Auto mark overdue allocations
    for (const allocation of allocations) {
      if (
        allocation.status ===
          "ACTIVE" &&
        new Date(
          allocation.dueDate
        ) < new Date()
      ) {
        allocation.status =
          "OVERDUE";

        await allocation.save();

        const assetName =
          (allocation.asset as any)?.name ||
         "Asset";

        const message =
         `Your asset ${assetName} is overdue. Please return it immediately.`;

        const existingNotification =
          await Notification.findOne({
            user:
              (allocation.user as any)?._id,
            title:
              "Asset Overdue",
            message,
          });

        if (
          !existingNotification
        ) {
          await Notification.create({
            user:
              (allocation.user as any)?._id,

            title:
              "Asset Overdue",

            message,
          });
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        allocations,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      { status: 500 }
    );
  }
}