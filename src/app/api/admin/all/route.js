import { connectDB } from '@/lib/mongodb'
import Request from '@/models/Request'

export async function GET() {
  await connectDB()
  const data = await Request.find().sort({ createdAt: -1 })
  return new Response(JSON.stringify(data), { status: 200 })
}
