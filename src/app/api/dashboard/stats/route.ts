import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";

import Asset from "@/models/Asset";
import Category from "@/models/Category";
import RequestModel from "@/models/Request";
import Allocation from "@/models/Allocation";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const totalAssets =
      await Asset.countDocuments();

    const availableAssets =
      await Asset.countDocuments({
        availableQuantity: {
          $gt: 0,
        },
      });

    const totalCategories =
      await Category.countDocuments();

    const activeRequests =
      await RequestModel.countDocuments({
        status: "PENDING",
      });

    const activeAllocations =
      await Allocation.countDocuments({
        status: "ACTIVE",
      });

    const totalUsers =
      await User.countDocuments();

    // Request Analytics

    const pendingRequests =
      await RequestModel.countDocuments({
        status: "PENDING",
      });

    const approvedRequests =
      await RequestModel.countDocuments({
        status: "APPROVED",
      });

    const rejectedRequests =
      await RequestModel.countDocuments({
        status: "REJECTED",
      });

    const returnedRequests =
      await RequestModel.countDocuments({
        status: "RETURNED",
      });

    const requestStatusData = [
      {
        name: "Pending",
        value: pendingRequests,
      },
      {
        name: "Approved",
        value: approvedRequests,
      },
      {
        name: "Rejected",
        value: rejectedRequests,
      },
      {
        name: "Returned",
        value: returnedRequests,
      },
    ];

    // Category Analytics

    const categories =
      await Category.find();

    const categoryData =
      await Promise.all(
        categories.map(
          async (category) => {
            const count =
              await Asset.countDocuments({
                category:
                  category._id,
              });

            return {
              name: category.name,
              value: count,
            };
          }
        )
      );

    return NextResponse.json(
      {
        success: true,

        stats: {
          totalAssets,
          availableAssets,
          totalCategories,
          activeRequests,
          activeAllocations,
          totalUsers,
        },

        requestStatusData,

        categoryData,
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