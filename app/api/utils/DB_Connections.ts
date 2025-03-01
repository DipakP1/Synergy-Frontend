import { Pool } from "pg";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

// # DATABASE_USER=postgres
// # DATABASE_HOST=13.233.244.159
// # DATABASE_NAME=Synergi-Solutions-DB
// # DATABASE_PASSWORD=postgres
// # DATABASE_PORT=5432
// # DATABASE_SSL=false

export const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT),
  ssl:
    process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

// export const pool: any = createClient(
//   "https://wlpohwxdskfcjnccpjpx.supabase.co",
//   process.env.SUPABASE_KEY,
// ) as any;

pool
  .connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

// import { Pool } from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }, // Required for Supabase
// });

// pool
//   .connect()
//   .then(() => console.log("Database connected successfully"))
//   .catch((err) => console.error("Database connection error:", err));
