import { pool } from "./utils/DB_Connections";

export async function GET() {
  try {
    console.log("Attempting to connect to the database...");

    console.log("Connected to the database");
    return new Response(
      JSON.stringify({
        message: "server is running & database is connected!",
        error: false,
      }),
      { status: 200 },
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
