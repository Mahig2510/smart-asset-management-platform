import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";

import Asset from "@/models/Asset";
import Category from "@/models/Category";

export async function GET() {
  try {
    await connectDB();

    const totalAssets =
      await Asset.countDocuments();

    const availableAssets =
      await Asset.countDocuments({
        status: "AVAILABLE",
      });

    const allocatedAssets =
      await Asset.countDocuments({
        status: "ALLOCATED",
      });

    const totalCategories =
      await Category.countDocuments();

    return NextResponse.json(
      {
        success: true,
        stats: {
          totalAssets,
          availableAssets,
          allocatedAssets,
          totalCategories,
        },
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