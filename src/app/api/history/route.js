import { connectDB } from '@/lib/mongodb'
import Request from '@/models/Request'

export async function POST(req) {
  try {
    await connectDB()
    const { email } = await req.json()

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email tidak ditemukan' }), { status: 400 })
    }

    const requests = await Request.find({ email }).sort({ createdAt: -1 })

    return new Response(JSON.stringify(requests), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Terjadi kesalahan pada server' }), { status: 500 })
  }
}
