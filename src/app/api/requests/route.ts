import { NextResponse } from "next/server";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db/connect";

import RequestModel from "@/models/Request";
import Asset from "@/models/Asset";

import User from "@/models/User";

import Category from "@/models/Category";


export async function GET() {
  try {
    await connectDB();
    const requests = await RequestModel.find()
      .populate("asset")
      .populate("user")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        requests,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("REQUEST ERROR",error);

    return NextResponse.json(
      {
        success: false,
        message: 
        error?.message || 
        "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request
) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      user,
      asset,
      quantity,
      startDate,
      endDate,
      purpose,
    } = body;

    const assetDoc =
      await Asset.findById(asset);

    if (!assetDoc) {
      return NextResponse.json(
        {
          success: false,
          message: "Asset not found",
        },
        { status: 404 }
      );
    }

    if (
      quantity >
      assetDoc.availableQuantity
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Requested quantity exceeds available inventory",
        },
        { status: 400 }
      );
    }

    const request = await RequestModel.create({
        user,
        asset,
        quantity,
        startDate,
        endDate,
        purpose,
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Request submitted successfully",
        request,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}