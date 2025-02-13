import { pool } from "../utils/DB_Connections";

export async function GET(req: Request) {
  try {
    console.log("Attempting to connect to the database...");
    const query = `SELECT * FROM messages;`;

    const client = await pool.connect();
    console.log("Connected to the database");

    const result = await client.query(query);
    console.log("Query executed successfully:", result.rows);

    const data = result.rows;
    client.release();
    
    return new Response(
      JSON.stringify({
        message: "Users fetched successfully!",
        data: data,
        error: false,
      }),
      { status: 200 } // Changed from 201 to 200
    );
  } catch (error: any) {
    console.error("Database Query Error:", error.message);
    return new Response(
      JSON.stringify({
        message: `Internal Server Error: ${error.message}`,
        error: true,
      }),
      { status: 500 },
    );
  }
}
