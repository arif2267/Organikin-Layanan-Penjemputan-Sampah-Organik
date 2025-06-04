// src/app/api/admin/status/route.js
import { connectDB } from '@/lib/mongodb'
import Request from '@/models/Request'

export async function POST(req) {
  await connectDB()
  const { id, status } = await req.json()

  try {
    const request = await Request.findById(id)
    if (!request) {
      return new Response(JSON.stringify({ error: 'Permintaan tidak ditemukan' }), { status: 404 })
    }

    // Validasi status
    const validTransitions = {
      'Menunggu Konfirmasi': 'Diproses',
      'Diproses': 'Selesai',
      'Selesai': ''
    }

    if (validTransitions[request.status] !== status) {
      return new Response(JSON.stringify({ error: 'Transisi status tidak valid' }), { status: 400 })
    }

    // Perbarui status
    request.status = status
    await request.save()

    return new Response(JSON.stringify(request), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Gagal memperbarui status' }), { status: 500 })
  }
}