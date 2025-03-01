// import bcrypt from "bcryptjs";
// import { pool } from "../utils/DB_Connections";

// export async function POST(req:Request) {
//   try {
//     const body = await req.json();
//     const { email, password } = body;

//     if (!email || !password) {
//       return new Response(
//         JSON.stringify({
//           message: "Email and password are required",
//           error: true,
//         }),
//         { status: 400 },
//       );
//     }

//     const existingUser = await pool.query(
//       "SELECT * FROM users WHERE email = $1",
//       [email],
//     );

//     if (existingUser.rows.length > 0) {
//       return new Response(
//         JSON.stringify({ message: "Admin already exists", error: true }),
//         { status: 409 },
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
//       email,
//       hashedPassword,
//     ]);

//     return new Response(
//       JSON.stringify({ message: "Admin created successfully!", error: false }),
//       { status: 201 },
//     );
//   } catch (error) {
//     console.error("Error:", error);
//     return new Response(
//       JSON.stringify({
//         message: `Internal Server Error: ${error}`,
//         error: true,
//       }),
//       { status: 500 },
//     );
//   }
// }

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string,
);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required", error: true },
        { status: 400 },
      );
    }

    // Sign up user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { message: error.message, error: true },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Admin created successfully!", error: false },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: true },
      { status: 500 },
    );
  }
}
