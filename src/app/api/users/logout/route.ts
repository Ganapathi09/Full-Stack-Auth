
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        message: "Logout successful",
        success: true,
      },
      { status: 200 }
    );

    // Clear the authentication cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error: unknown) {
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

