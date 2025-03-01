// import { NextResponse } from "next/server";
// import { pool } from "../../utils/DB_Connections";
// import nodemailer from "nodemailer";
// import bcrypt from "bcryptjs";
// import NextCrypto from "next-crypto";

// const secretKey: any = process.env.SECRET_KEY;
// export async function POST(req: Request) {
//   const { email } = await req.json();

//   if (!email) {
//     return new Response(
//       JSON.stringify({
//         message: "Email is required!",
//         error: true,
//       }),
//       { status: 400 },
//     );
//   }

//   // Find the user
//   let userAvailable: any = await pool.query(
//     "SELECT * FROM users WHERE email = $1",
//     [email],
//   );

//   if (!userAvailable.rows.length) {
//     return new Response(
//       JSON.stringify({
//         message: "User not available",
//         error: true,
//       }),
//       { status: 401 },
//     );
//   }
//   const id: string = userAvailable.rows[0]?.id.toString();

//   const crypto = new NextCrypto(secretKey);
//   const encrypted = await crypto.encrypt(id);

//   console.log(encrypted, "encriptID");

//   const html = `
//     <p>Hi, Super Admin,</p>
//     <p>Here's your password recovery link</p>
//     <a href="${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/login/reset-password?id=${encrypted}">Reset password here</a>
//     <p>Best regards, Synergi</p>
//   `;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.SMTP_SERVER_USERNAME,
//       pass: process.env.SMTP_SERVER_PASSWORD,
//     },
//   });

//   if (userAvailable.rows.length > 0) {
//     const info = await transporter.sendMail({
//       from: process.env.SITE_MAIL_RECEIVER,
//       to: userAvailable.rows[0].email,
//       subject: `Reset your Libertas password`,
//       html: html,
//     });

//     return new Response(
//       JSON.stringify({
//         message: `Password recovery email has been sent succesfully to ${userAvailable.rows[0].email}!`,
//         error: false,
//         id: userAvailable.id,
//         email: userAvailable.email,
//         info: info,
//       }),
//       { status: 201 },
//     );
//   } else {
//     // res.status(400);
//     return new Response(
//       JSON.stringify({
//         message: "Something went wrong!",
//         error: true,
//       }),
//       { status: 500 },
//     );
//   }
// }


import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import NextCrypto from "next-crypto";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey!);

const secretKey: any = process.env.SECRET_KEY;
const ENV = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return new Response(
      JSON.stringify({ message: "Email is required!", error: true }),
      { status: 400 },
    );
  }

  // Find the user in Supabase
  const { data: user, error } = await supabase
    .from("messages")
    .select("id, email")
    .eq("email", email)
    .single();

  if (error || !user) {
    return new Response(
      JSON.stringify({ message: "User not found", error: true }),
      { status: 404 },
    );
  }

  // Encrypt the user ID
  const crypto = new NextCrypto(secretKey);
  const encrypted = await crypto.encrypt(user.id.toString());

  console.log(encrypted, "Encrypted User ID");

  const resetUrl = `${ENV}/admin/login/reset-password?id=${encrypted}`;

  const html = `
    <p>Hi,</p>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
    <p>If you didn't request this, please ignore this email.</p>
  `;

  // Configure nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_SERVER_USERNAME,
      pass: process.env.SMTP_SERVER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SITE_MAIL_RECEIVER,
    to: user.email,
    subject: "Reset Your Password",
    html: html,
  });

  return new Response(
    JSON.stringify({
      message: `Password reset link sent to ${user.email}!`,
      error: false,
    }),
    { status: 200 },
  );
}
