import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db/connect";
import User from "@/models/User";
import { loginSchema } from "@/validations/auth.schema";
import { generateToken } from "@/lib/auth/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const validatedData = loginSchema.parse(body);

    const user = await User.findOne({
      email: validatedData.email,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      validatedData.password,
      user.password
    );

    if (!isPasswordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

  const token = generateToken({
  userId: user._id.toString(),
  email: user.email,
  role: user.role,
});

const response = NextResponse.json(
  {
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  },
  { status: 200 }
);

response.cookies.set("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7,
  path: "/",
});

return response;

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