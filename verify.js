import { neon } from '@neondatabase/serverless';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const dbUrlMatch = envFile.match(/DATABASE_URL="?([^"\n]+)"?/);
if (!dbUrlMatch) throw new Error("DATABASE_URL not found");
const dbUrl = dbUrlMatch[1];

const sql = neon(dbUrl);

async function run() {
  console.log("Dropping table...");
  const result = await sql`DROP TABLE IF EXISTS users CASCADE`;
  console.log("Dropped table!", result);
}
run();
