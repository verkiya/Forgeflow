import { db } from "./lib/db/index.js"
import { workflows } from "./lib/db/schema.js"

async function main() {
  const all = await db.select().from(workflows)
  console.log(JSON.stringify(all, null, 2))
}

main().catch(console.error)
