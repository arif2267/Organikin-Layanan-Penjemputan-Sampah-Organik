// src/app/api/admin/confirm/route.js
import { connectDB } from '@/lib/mongodb'
import Request from '@/models/Request'

export async function POST(req) {
  await connectDB()
  const { id, status } = await req.json()

  try {
    const updated = await Request.findByIdAndUpdate(id, { status }, { new: true })
    return new Response(JSON.stringify(updated), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Gagal memperbarui status' }), { status: 500 })
  }
}
