

import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./utils/schema.ts",
  dialect: 'mysql',
  dbCredentials: {
    host: "mysql-204bbace-atharva0bokade-aefd.c.aivencloud.com",
     user: "avnadmin",
     database: "defaultdb",
      password:process.env.DBPASSWORD||"AVNS_9YY3Dz6FbFpUKxXnD61",
     port:25709,
  },
  verbose: true,
  strict: true,
})