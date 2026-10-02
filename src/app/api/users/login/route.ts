
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connect();

    // Get data from frontend
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 400 }
      );
    }

    // Create token data
    const tokenData = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };

    // Create JWT token
    const token = jwt.sign(
      tokenData,
      process.env.TOKEN_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    // Create response
    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
      },
      { status: 200 }
    );

    // Store token in cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;

  } catch (error: unknown) {
    console.error("Login error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
