import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config(); // Load environment variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  phoneNo,
  name,
  message,
  html,
  text,
}: any) {
  try {
    // Read HTML file from disk
    const htmlFilePath = path.join(__dirname, "mail.html");
    const htmlContent = await fs.promises.readFile(htmlFilePath, "utf8");
    const htmlContentFile = htmlContent
      .replace("{{userName}}", name)
      .replace("{{emailId}}", email)
      .replace("{{mobilleNo}}", phoneNo)
      .replace("{{message}}", message);


    await transporter.verify();

    const info = await transporter.sendMail({
      from: email,
      to: sendTo || process.env.SITE_MAIL_RECEIVER,
      subject,
      text: subject === "New Contact Form Submission" ? text : "",
      html: subject === "New Contact Form Submission" ? html : htmlContentFile,
    });

    return info;
  } catch (error) {
    console.error("Email Send Error:", error);
  }
}
