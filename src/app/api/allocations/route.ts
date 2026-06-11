import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";

import Allocation from "@/models/Allocation";

import User from "@/models/User";

console.log("User import:", User);

import Asset from "@/models/Asset";
import RequestModel from "@/models/Request";

import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();


if (!mongoose.models.User) {
  throw new Error("User model not registered");
}

   const allocations =
  await Allocation.find()
    .populate("asset")
    .populate("user")
    .sort({ createdAt: -1 });

    console.log("ALLOC MODELS:", Object.keys(mongoose.models));
console.log("USER MODEL:", mongoose.models.User);

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