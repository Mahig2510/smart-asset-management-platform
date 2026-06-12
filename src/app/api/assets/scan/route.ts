import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";

import Asset from "@/models/Asset";

export async function GET(
  req: Request
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(req.url);

    const assetId =
      searchParams.get(
        "assetId"
      );

    if (!assetId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Asset ID required",
        },
        { status: 400 }
      );
    }

    const asset =
      await Asset.findOne({
        assetId,
      });

    if (!asset) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Asset not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        asset,
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