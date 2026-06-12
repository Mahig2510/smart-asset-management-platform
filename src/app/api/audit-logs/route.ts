import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import AuditLog from "@/models/AuditLog";
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
    if (currentUser.role !== "ADMIN") {
  return NextResponse.json(
    {
      success: false,
      message: "Access denied",
    },
    { status: 403 }
  );
}

    const logs =
      await AuditLog.find()
        .populate("user")
        .sort({
          createdAt: -1,
        });

    return NextResponse.json(
      {
        success: true,
        logs,
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