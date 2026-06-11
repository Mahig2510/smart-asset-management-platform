import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";
import Asset from "@/models/Asset";
import Category from "@/models/Category";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: Request,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { id } = await params;

    const asset = await Asset.findById(id)
      .populate("category")
      .populate("assignedTo");

    if (!asset) {
      return NextResponse.json(
        {
          success: false,
          message: "Asset not found",
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
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    if (body.category) {
      const categoryExists =
        await Category.findById(body.category);

      if (!categoryExists) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid category",
          },
          { status: 404 }
        );
      }
    }

    const updatedAsset =
      await Asset.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedAsset) {
      return NextResponse.json(
        {
          success: false,
          message: "Asset not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Asset updated successfully",
        asset: updatedAsset,
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

export async function DELETE(
  req: Request,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedAsset =
      await Asset.findByIdAndDelete(id);

    if (!deletedAsset) {
      return NextResponse.json(
        {
          success: false,
          message: "Asset not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Asset deleted successfully",
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