import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

import { connectDB } from "@/lib/db/connect";

import Allocation from "@/models/Allocation";

import User from "@/models/User";

console.log("User import:", User);

import Asset from "@/models/Asset";
import RequestModel from "@/models/Request";


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