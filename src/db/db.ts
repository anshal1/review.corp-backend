import 'dotenv/config'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'

declare global {
  var dataBase: NodePgDatabase | undefined
}

export const db = global.dataBase ?? drizzle(process.env.DATABASE_URL!)

// Only assign to global in development to prevent memory leaks in production
if (process.env.NODE_ENV !== 'production') {
  global.dataBase = db
}
