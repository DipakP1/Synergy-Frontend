import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.SMTP_SERVER_HOST,
  port: Number(process.env.SMTP_SERVER_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_SERVER_USERNAME,
    pass: process.env.SMTP_SERVER_PASSWORD,
  },
});

export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html,
}: {
  email: string;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    await transporter.verify();

    const info = await transporter.sendMail({
      from: email,
      to: sendTo || process.env.SITE_MAIL_RECEIVER,
      subject,
      text,
      html: html || "",
    });

    console.log("Email Sent:", info);
    return info;
  } catch (error) {
    console.error("Email Send Error:", error);
  }
}
