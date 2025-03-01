// import { pool } from "../utils/DB_Connections";

// export async function GET(req: Request) {
//   try {
//     console.log("Attempting to connect to the database...");
//     const query = `SELECT * FROM messages;`;

//     const client = await pool.connect();

//     const result = await client.query(query);

//     const data = result.rows;
//     client.release();
    
//     return new Response(
//       JSON.stringify({
//         message: "Users fetched successfully!",
//         data: data,
//         error: false,
//       }),
//       { status: 200 } // Changed from 201 to 200
//     );
//   } catch (error: any) {
//     console.error("Database Query Error:", error.message);
//     return new Response(
//       JSON.stringify({
//         message: `Internal Server Error: ${error.message}`,
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

export async function GET() {
  try {
    console.log("Attempting to fetch messages from Supabase...");

    // Fetch messages from Supabase
    const { data, error } = await supabase.from("messages").select("*");

    if (error) {
      console.error("Database Query Error:", error.message);
      return NextResponse.json(
        { message: "Failed to fetch messages", error: true },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Messages fetched successfully!", data, error: false },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Server Error:", error.message);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}`, error: true },
      { status: 500 },
    );
  }
}
