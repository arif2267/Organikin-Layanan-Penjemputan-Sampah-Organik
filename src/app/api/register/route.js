import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    await connectDB()

    const { email, password } = await req.json()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Email sudah terdaftar' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()

    return new Response(JSON.stringify({ message: 'Pendaftaran berhasil!' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error saat register:', error)
    return new Response(JSON.stringify({ message: 'Terjadi kesalahan di server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
