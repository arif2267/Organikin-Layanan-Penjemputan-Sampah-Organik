// src/app/api/admin/complete/route.js
import connectDB from '@/utils/db'
import Request from '@/models/Request'

export async function POST(req) {
  await connectDB()
  const { id } = await req.json()

  try {
    const updated = await Request.findByIdAndUpdate(id, { status: 'Selesai' }, { new: true })
    return Response.json(updated)
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 })
  }
}
