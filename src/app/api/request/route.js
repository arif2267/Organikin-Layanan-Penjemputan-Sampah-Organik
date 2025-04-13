import { connectDB } from '@/lib/mongodb'
import Request from '@/models/Request'

export async function POST(req) {
  try {
    await connectDB()
    const body = await req.json()

    const { name, phone, address, description, email } = body

    if (!name || !phone || !address || !email) {
      return new Response(JSON.stringify({ message: 'Data tidak lengkap' }), { status: 400 })
    }

    const newRequest = await Request.create({
      name,
      phone,
      address,
      description,
      email,
    })

    return new Response(JSON.stringify({ message: 'Berhasil disimpan', data: newRequest }), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: 'Terjadi kesalahan server' }), { status: 500 })
  }
}
