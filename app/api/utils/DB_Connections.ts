import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Synergi-Solutions-DB",
  password: "Dipak@100",
  port: 5432,
});
