import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db/connect";
import Category from "@/models/Category";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Category name is required",
        },
        { status: 400 }
      );
    }

    const existingCategory = await Category.findOne({
      name,
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Category already exists",
        },
        { status: 409 }
      );
    }

    const category = await Category.create({
      name,
      description,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        category,
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

    const categories = await Category.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        categories,
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