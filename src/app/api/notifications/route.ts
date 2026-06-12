import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import Notification from "@/models/Notification";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const currentUser =
      await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
        },
        { status: 401 }
      );
    }

    const notifications =
      await Notification.find({
        user:
          currentUser.userId,
      }).sort({
        createdAt: -1,
      });

    return NextResponse.json(
      {
        success: true,
        notifications,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }
}