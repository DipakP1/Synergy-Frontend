import { NextResponse } from "next/server";
import { pool } from "../../utils/DB_Connections";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  const { id, password, confirmPassword } = await req.json();

  if (!password || !confirmPassword) {
    return new Response(
      JSON.stringify({
        message: "Both password fields are required",
        error: true,
      }),
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return new Response(
      JSON.stringify({
        message: "Passwords do not match",
        error: true,
      }),
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const client = await pool.connect();
    const updateUserQuery = `
      UPDATE users
      SET password = $1
      WHERE id = $2
      RETURNING id;
    `;

    const result = await client.query(updateUserQuery, [hashedPassword, id]);
    client.release();

    if (result.rowCount > 0) {
      return new Response(
        JSON.stringify({
          message: "Password has been reset successfully",
          error: false,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "User not found or update failed",
          error: true,
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
        error: true,
      }),
      { status: 500 }
    );
  }
}
