import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";

import Allocation from "@/models/Allocation";

import User from "@/models/User";

import Asset from "@/models/Asset";
import RequestModel from "@/models/Request";

export async function GET() {
  try {
    await connectDB();

   const allocations =
  await Allocation.find()
    .populate("asset")
    .populate("user")
    .sort({ createdAt: -1 });

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