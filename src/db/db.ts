import { connect } from 'mongoose'

export async function handleDBConnect() {
  const DB_URL = process.env.DATABASE_URL
  if (!DB_URL) throw new Error('Database URL not found')
  await connect(DB_URL)
  console.log('Database connected')
}
