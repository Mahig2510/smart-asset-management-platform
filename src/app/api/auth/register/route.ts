import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db/connect";
import User from "@/models/User";
import { registerSchema } from "@/validations/auth.schema";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const validatedData = registerSchema.parse(body);

    const existingUser = await User.findOne({
      email: validatedData.email,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      validatedData.password,
      10
    );

   const user = await User.create({
  name: validatedData.name,
  email: validatedData.email,
  password: hashedPassword,
});

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
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