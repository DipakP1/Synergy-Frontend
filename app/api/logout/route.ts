import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    (await cookies()).set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0), 
    });

    return NextResponse.json(
      { message: "User logged out successfully!", error: false },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: true },
      { status: 500 }
    );
  }
}
