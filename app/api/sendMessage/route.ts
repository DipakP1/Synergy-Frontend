import { pool } from "../utils/DB_Connections";
import { sendMail } from "../utils/mail";

// fs.readFile('mailTemplate.html', function (err, data) {
//   // Display the file content
//   console.log(data, "HTML DATAAAA");
// });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, phoneNo, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          message: "Name, email, and message are required.",
          error: true,
        }),
        { status: 400 },
      );
    }

    const query = `
      INSERT INTO messages (name, email, subject, phone_no, message)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [name, email, subject || null, phoneNo || null, message];

    const client = await pool.connect();
    await client.query(query, values);
    client.release();

    //SENDER MAIL
    await sendMail({
      email,
      phoneNo: phoneNo,
      sendTo: process.env.SITE_MAIL_RECEIVER!,
      name: name,
      subject: subject,
      message: message,
    });

    ///RECIEVER MAIL
    await sendMail({
      email: process.env.SMTP_SERVER_USERNAME!,
      phoneNo: phoneNo,
      sendTo: email,
      name: name,
      subject: "New Contact Form Submission",
      text: "A new user has submitted a message.",
      html: `<h3>New Contact Form Submission</h3>
             <p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Phone:</b> ${phoneNo || "Not provided"}</p>
             <p><b>Subject:</b> ${subject || "No Subject"}</p>
             <p><b>Message:</b> ${message}</p>
             <br/>
             <p>Admin, please check the system for details.</p>`,
    });

    return new Response(
      JSON.stringify({ message: "Message sent successfully!", error: false }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Server Error:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error: true }),
      { status: 500 },
    );
  }
}
