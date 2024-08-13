import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "mysql-204bbace-atharva0bokade-aefd.c.aivencloud.com",
  user: "avnadmin",
  database: "defaultdb",
 password:"AVNS_9YY3Dz6FbFpUKxXnD61",
 port:"25709",
});

export const db = drizzle(connection);
