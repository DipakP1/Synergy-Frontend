// import { NextResponse } from "next/server";
// import { pool } from "../../utils/DB_Connections";
// import bcrypt from "bcryptjs";

// export async function PUT(req: Request) {
//   const { id, password, confirmPassword } = await req.json();

//   if (!password || !confirmPassword) {
//     return new Response(
//       JSON.stringify({
//         message: "Both password fields are required",
//         error: true,
//       }),
//       { status: 400 }
//     );
//   }

//   if (password !== confirmPassword) {
//     return new Response(
//       JSON.stringify({
//         message: "Passwords do not match",
//         error: true,
//       }),
//       { status: 400 }
//     );
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     const client = await pool.connect();
//     const updateUserQuery = `
//       UPDATE users
//       SET password = $1
//       WHERE id = $2
//       RETURNING id;
//     `;

//     const result = await client.query(updateUserQuery, [hashedPassword, id]);
//     client.release();

//     if (result.rowCount > 0) {
//       return new Response(
//         JSON.stringify({
//           message: "Password has been reset successfully",
//           error: false,
//         }),
//         { status: 200 }
//       );
//     } else {
//       return new Response(
//         JSON.stringify({
//           message: "User not found or update failed",
//           error: true,
//         }),
//         { status: 400 }
//       );
//     }
//   } catch (error) {
//     console.error("Error updating password:", error);
//     return new Response(
//       JSON.stringify({
//         message: "Internal server error",
//         error: true,
//       }),
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import NextCrypto from "next-crypto";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

const secretKey: any = process.env.SECRET_KEY;

export async function PUT(req: Request) {
  const { id, password, confirmPassword } = await req.json();

  if (!password || !confirmPassword) {
    return new Response(
      JSON.stringify({
        message: "Both password fields are required",
        error: true,
      }),
      { status: 400 },
    );
  }

  if (password !== confirmPassword) {
    return new Response(
      JSON.stringify({ message: "Passwords do not match", error: true }),
      { status: 400 },
    );
  }

  try {
    // Decrypt user ID
    // const crypto = new NextCrypto(secretKey);
    // const decryptedId = await crypto.decrypt(id);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password in Supabase
    const { error } = await supabase
      .from("users")
      .update({ password: hashedPassword })
      .eq("id", id);

    if (error) {
      return new Response(
        JSON.stringify({ message: "Error updating password", error: true }),
        { status: 500 },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Password has been reset successfully",
        error: false,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: true }),
      { status: 500 },
    );
  }
}
