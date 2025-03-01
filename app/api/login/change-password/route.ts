// import { NextResponse } from "next/server";
// import { pool } from "../../utils/DB_Connections";
// import bcrypt from "bcryptjs";

// export async function PUT(req: Request) {
//   try {
//     const { userId, currentPassword, newPassword, confirmPassword } = await req.json();

//     if (!userId || !currentPassword || !newPassword || !confirmPassword) {
//       return NextResponse.json(
//         { message: "All fields are required", error: true },
//         { status: 400 }
//       );
//     }

//     if (newPassword !== confirmPassword) {
//       return NextResponse.json(
//         { message: "Passwords do not match", error: true },
//         { status: 400 }
//       );
//     }

//     const client = await pool.connect();

//     // Fetch the user's current password
//     const userQuery = "SELECT password FROM users WHERE id = $1";
//     const userResult = await client.query(userQuery, [userId]);

//     if (userResult.rowCount === 0) {
//       client.release();
//       return NextResponse.json(
//         { message: "User not found", error: true },
//         { status: 404 }
//       );
//     }

//     const user = userResult.rows[0];
//     const passwordMatch = await bcrypt.compare(currentPassword, user.password);

//     if (!passwordMatch) {
//       client.release();
//       return NextResponse.json(
//         { message: "Current password is incorrect", error: true },
//         { status: 400 }
//       );
//     }

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update password
//     const updateQuery = "UPDATE users SET password = $1 WHERE id = $2 RETURNING id";
//     const updateResult = await client.query(updateQuery, [hashedPassword, userId]);

//     client.release();

//     if (updateResult.rowCount > 0) {
//       return NextResponse.json(
//         { message: "Password has been changed successfully", error: false },
//         { status: 200 }
//       );
//     } else {
//       return NextResponse.json(
//         { message: "Password update failed", error: true },
//         { status: 400 }
//       );
//     }
//   } catch (error) {
//     console.error("Error updating password:", error);
//     return NextResponse.json(
//       { message: "Internal server error", error: true },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
);

// export async function PUT(req: Request) {
//   try {
//     const { email, newPassword, confirmPassword } = await req.json();

//     if (!email || !newPassword || !confirmPassword) {
//       return NextResponse.json(
//         { message: "All fields are required", error: true },
//         { status: 400 },
//       );
//     }

//     if (newPassword !== confirmPassword) {
//       return NextResponse.json(
//         { message: "Passwords do not match", error: true },
//         { status: 400 },
//       );
//     }

//     const { data: users, error: userError } =
//       await supabase.auth.admin.listUsers();
//     if (userError || !users || !users.users.length) {
//       return NextResponse.json(
//         { message: "User not found", error: true },
//         { status: 404 },
//       );
//     }

//     const user = users.users.find((u) => u.email === email);
//     if (!user) {
//       return NextResponse.json(
//         { message: "User not found", error: true },
//         { status: 404 },
//       );
//     }

//     const userId = user.id;

//     const { error: updateError } = await supabase.auth.admin.updateUserById(
//       userId,
//       {
//         password: newPassword,
//       },
//     );

//     if (updateError) {
//       console.error("Update error:", updateError.message);
//       return NextResponse.json(
//         {
//           message: `Password update failed: ${updateError.message}`,
//           error: true,
//         },
//         { status: 400 },
//       );
//     }

//     const { error: signOutError } = await supabase.auth.signOut();

//     if (signOutError) {
//       console.error("Logout error:", signOutError.message);
//       return NextResponse.json(
//         { message: "Password updated but failed to log out", error: true },
//         { status: 400 },
//       );
//     }

//     (cookies() as any).delete("token");

//     return NextResponse.json(
//       {
//         message: "Password changed successfully. Please log in again.",
//         error: false,
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("Error updating password:", error);
//     return NextResponse.json(
//       { message: "Internal server error", error: true },
//       { status: 500 },
//     );
//   }
// }

export async function PUT(req: Request) {
  try {
    const { email, currentPassword, newPassword, confirmPassword } =
      await req.json();

    if (!email || !currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields are required", error: true },
        { status: 400 },
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match", error: true },
        { status: 400 },
      );
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });

    if (signInError) {
      return NextResponse.json(
        { message: "Current password is incorrect", error: true },
        { status: 401 },
      );
    }

    const { data: users, error: userError } =
      await supabase.auth.admin.listUsers();
    if (userError || !users || !users.users.length) {
      return NextResponse.json(
        { message: "User not found", error: true },
        { status: 404 },
      );
    }

    const user = users.users.find((u) => u.email === email);
    if (!user) {
      return NextResponse.json(
        { message: "User not found", error: true },
        { status: 404 },
      );
    }

    const userId = user.id;

    const { error: updateError } = await supabase.auth.admin.updateUserById(
      userId,
      {
        password: newPassword,
      },
    );

    if (updateError) {
      console.error("Update error:", updateError.message);
      return NextResponse.json(
        {
          message: `Password update failed: ${updateError.message}`,
          error: true,
        },
        { status: 400 },
      );
    }

    // const { error: signOutError } = await supabase.auth.signOut();

    // if (signOutError) {
    //   console.error("Logout error:", signOutError.message);
    //   return NextResponse.json(
    //     { message: "Password updated but failed to log out", error: true },
    //     { status: 400 },
    //   );
    // }

    (cookies() as any).delete("token");

    return NextResponse.json(
      {
        message: "Password changed successfully. Please log in again.",
        error: false,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: true },
      { status: 500 },
    );
  }
}
