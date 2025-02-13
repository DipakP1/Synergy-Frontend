import bcrypt from "bcryptjs";
import { pool } from "../utils/DB_Connections";

export async function POST(req:Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          message: "Email and password are required",
          error: true,
        }),
        { status: 400 },
      );
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return new Response(
        JSON.stringify({ message: "Admin already exists", error: true }),
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      email,
      hashedPassword,
    ]);

    return new Response(
      JSON.stringify({ message: "Admin created successfully!", error: false }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        message: `Internal Server Error: ${error}`,
        error: true,
      }),
      { status: 500 },
    );
  }
}
