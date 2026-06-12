import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import RequestModel from "@/models/Request";
import User from "@/models/User";
import Asset from "@/models/Asset";

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

    let history;

    if (
      currentUser.role === "ADMIN"
    ) {
      history =
        await RequestModel.find()
          .populate("user")
          .populate("asset")
          .sort({
            createdAt: -1,
          });
    } else {
      history =
        await RequestModel.find({
          user:
            currentUser.userId,
        })
          .populate("user")
          .populate("asset")
          .sort({
            createdAt: -1,
          });
    }

    return NextResponse.json(
      {
        success: true,
        history,
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