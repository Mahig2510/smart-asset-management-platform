import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { connectDB } from "@/lib/db/connect";

import Request from "@/models/Request";
import Asset from "@/models/Asset";
import Allocation from "@/models/Allocation";

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

    const requestDoc =
      await Request.findById(id)
        .populate("user")
        .populate("asset");

    if (!requestDoc) {
      return NextResponse.json(
        {
          success: false,
          message: "Request not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        request: requestDoc,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const currentUser = await getCurrentUser();

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

    const { id } = await params;

    const body = await req.json();

    const requestDoc =
      await Request.findById(id);

    if (!requestDoc) {
      return NextResponse.json(
        {
          success: false,
          message: "Request not found",
        },
        { status: 404 }
      );
    }

    if (
  body.status === "APPROVED"
) {
  if (
    requestDoc.status ===
    "APPROVED"
  ) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Request already approved",
      },
      { status: 400 }
    );
  }

  const asset =
    await Asset.findById(
      requestDoc.asset
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

  if (
    requestDoc.quantity >
    asset.availableQuantity
  ) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Insufficient inventory",
      },
      { status: 400 }
    );
  }

  asset.availableQuantity =
    asset.availableQuantity -
    requestDoc.quantity;

  await asset.save();

  requestDoc.status =
    "APPROVED";

  requestDoc.approvedAt =
    new Date();

  await requestDoc.save();

  await Allocation.create({
    user: requestDoc.user,

    asset: requestDoc.asset,

    request: requestDoc._id,

    quantity:
      requestDoc.quantity,

    issueDate: new Date(),

    dueDate:
      requestDoc.endDate,

    status: "ACTIVE",
  });
}

    if (
      body.status === "REJECTED"
    ) {
      requestDoc.status =
        "REJECTED";

      requestDoc.rejectionReason =
        body.rejectionReason || "";

      await requestDoc.save();
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Request updated successfully",
        request: requestDoc,
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