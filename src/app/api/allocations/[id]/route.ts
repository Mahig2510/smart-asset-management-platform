import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";

import Allocation from "@/models/Allocation";
import Asset from "@/models/Asset";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  req: Request,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { id } = await params;

    const allocation =
      await Allocation.findById(id);

    if (!allocation) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Allocation not found",
        },
        { status: 404 }
      );
    }

    if (
      allocation.status ===
      "RETURNED"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Asset already returned",
        },
        { status: 400 }
      );
    }

    const asset =
      await Asset.findById(
        allocation.asset
      );

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

    asset.availableQuantity =
      asset.availableQuantity +
      allocation.quantity;

    await asset.save();

    allocation.status =
      "RETURNED";

    allocation.returnDate =
      new Date();

    await allocation.save();

    return NextResponse.json(
      {
        success: true,
        message:
          "Asset returned successfully",
        allocation,
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