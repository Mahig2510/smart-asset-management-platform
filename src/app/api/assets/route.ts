import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";
import Asset from "@/models/Asset";
import Category from "@/models/Category";

import { getCurrentUser } from "@/lib/auth/getCurrentUser";
export async function POST(req: Request) {
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

if (currentUser.role !== "ADMIN") {
  return NextResponse.json(
    {
      success: false,
      message: "Access denied",
    },
    { status: 403 }
  );
}
    const body = await req.json();

    const {
      assetId,
      name,
      description,
      category,
      serialNumber,
      purchaseDate,
      purchaseCost,
      location,
      totalQuantity,
      availableQuantity,
      maintenanceNotes,
    } = body;

    if (!assetId || !name || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "assetId, name and category are required",
        },
        { status: 400 }
      );
    }

    const existingAsset = await Asset.findOne({
      assetId,
    });

    if (existingAsset) {
      return NextResponse.json(
        {
          success: false,
          message: "Asset ID already exists",
        },
        { status: 409 }
      );
    }

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category",
        },
        { status: 404 }
      );
    }

    const asset = await Asset.create({
      assetId,
      name,
      description,
      category,
      serialNumber,
      purchaseDate,
      purchaseCost,
      location,
      totalQuantity,
      availableQuantity,
      maintenanceNotes,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Asset created successfully",
        asset,
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

export async function GET() {
  try {
    await connectDB();

    const assets = await Asset.find()
      .populate("category")
      .populate("assignedTo")
      .sort({
        createdAt: -1,
      });

    return NextResponse.json(
      {
        success: true,
        assets,
      },
      { status: 200 }
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