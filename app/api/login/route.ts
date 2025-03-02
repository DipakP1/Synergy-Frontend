// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { pool } from "../utils/DB_Connections";

// const SECRET_KEY = process.env.SECRET_KEY;

// export async function POST(req: Request) {
//   try {
//     if (!SECRET_KEY) {
//       throw new Error("SECRET_KEY is not defined in environment variables.");
//     }

//     const { email, password } = await req.json();

//     const result = await pool.query("SELECT * FROM users WHERE email = $1", [
//       email,
//     ]);

//     if (result.rows.length === 0) {
//       return NextResponse.json(
//         { message: "Invalid credentials", error: true },
//         { status: 401 },
//       );
//     }

//     const existingUser = result.rows[0];

//     const isMatch = await bcrypt.compare(password, existingUser.password);
//     if (!isMatch) {
//       return NextResponse.json(
//         { message: "Invalid credentials", error: true },
//         { status: 401 },
//       );
//     }

//     const token = jwt.sign(
//       { email: existingUser.email, id: existingUser.id },
//       SECRET_KEY,
//       {
//         expiresIn: "1h",
//       },
//     );

//     (await cookies()).set("token", token, {
//       httpOnly: true,
//       // secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//     });

//     return NextResponse.json(
//       { message: "User logged in successfully!", error: false },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("Login error:", error);
//     return NextResponse.json(
//       { message: `Internal Server Error`, error: true },
//       { status: 500 },
//     );
//   }
// }

import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string,
);

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    } as any);

    console.log(data, "USER DATA");

    if (error) {
      return NextResponse.json(
        { message: error.message, error: true },
        { status: 401 },
      );
    }

    // Get the access token
    const { session } = data;
    const token = session?.access_token;


    if (!token) {
      return NextResponse.json(
        { message: "Failed to retrieve token", error: true },
        { status: 500 },
      );
    }

    // Set token in cookies
    (cookies() as any).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json(
      { message: "User logged in successfully!", error: false },
      { status: 200 },
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: true },
      { status: 500 },
    );
  }
}
