import { NextResponse } from "next/server";
import { pool } from "../../utils/DB_Connections";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  try {
    const { userId, currentPassword, newPassword, confirmPassword } = await req.json();
    
    if (!userId || !currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields are required", error: true },
        { status: 400 }
      );
    }
    
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match", error: true },
        { status: 400 }
      );
    }
    
    const client = await pool.connect();
    
    // Fetch the user's current password
    const userQuery = "SELECT password FROM users WHERE id = $1";
    const userResult = await client.query(userQuery, [userId]);
    
    if (userResult.rowCount === 0) {
      client.release();
      return NextResponse.json(
        { message: "User not found", error: true },
        { status: 404 }
      );
    }
    
    const user = userResult.rows[0];
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!passwordMatch) {
      client.release();
      return NextResponse.json(
        { message: "Current password is incorrect", error: true },
        { status: 400 }
      );
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    const updateQuery = "UPDATE users SET password = $1 WHERE id = $2 RETURNING id";
    const updateResult = await client.query(updateQuery, [hashedPassword, userId]);
    
    client.release();
    
    if (updateResult.rowCount > 0) {
      return NextResponse.json(
        { message: "Password has been changed successfully", error: false },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Password update failed", error: true },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { message: "Internal server error", error: true },
      { status: 500 }
    );
  }
}
