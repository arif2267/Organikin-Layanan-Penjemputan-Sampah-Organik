// src/app/api/admin/confirm/route.js
import { connectDB } from '@/lib/mongodb'
import Request from '@/models/Request'

export async function POST(req) {
  await connectDB()
  const { id, status } = await req.json()

  try {
    // Ambil request saat ini
    const currentRequest = await Request.findById(id)
    if (!currentRequest) {
      return new Response(JSON.stringify({ error: 'Permintaan tidak ditemukan' }), { status: 404 })
    }

    // Validasi status yang diperbolehkan
    const validTransitions = {
      'Menunggu Konfirmasi': ['Diproses'],
      'Diproses': ['Selesai'],
      'Selesai': []
    }

    if (!validTransitions[currentRequest.status].includes(status)) {
      return new Response(JSON.stringify({ error: 'Transisi status tidak valid' }), { status: 400 })
    }

    // Perbarui status jika valid
    currentRequest.status = status
    await currentRequest.save()

    return new Response(JSON.stringify(currentRequest), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Gagal memperbarui status' }), { status: 500 })
  }
}
