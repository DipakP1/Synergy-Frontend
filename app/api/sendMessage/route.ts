import { pool } from "../utils/DB_Connections";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, phoneNo, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Name, email, and message are required.", error: true }),
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO messages (name, email, subject, phone_no, message)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [name, email, subject || null, phoneNo || null, message];

    const client = await pool.connect();
    const result = await client.query(query, values);
    client.release();

    return new Response(
      JSON.stringify({ message: "Message send successfully!", error: false }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ message: `Internal Server Error: ${error}`, error: true }),
      { status: 500 }
    );
  }
}
