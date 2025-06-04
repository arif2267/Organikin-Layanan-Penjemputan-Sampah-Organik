import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  await connectDB()

  try {
    const { email, password } = await req.json()

    const user = await User.findOne({ email })
    if (!user) {
      return new Response(JSON.stringify({ message: 'Email atau password salah.' }), { status: 401 })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return new Response(JSON.stringify({ message: 'Email atau password salah.' }), { status: 401 })
    }

    // Kembalikan role dari user
    return new Response(JSON.stringify({ role: user.role }), { status: 200 })
  } catch (error) {
    console.error('Login error:', error)
    return new Response(JSON.stringify({ message: 'Terjadi kesalahan saat login.' }), { status: 500 })
  }
}