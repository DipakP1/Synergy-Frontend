import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "13.233.244.159",
  database: "Synergi-Solutions-DB",
  password: "postgres",
  port: 5432,
});

