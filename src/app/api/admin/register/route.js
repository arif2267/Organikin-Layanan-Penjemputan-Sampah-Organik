import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  await connectDB()

  try {
    const { email, password, role } = await req.json()

    // Validasi input
    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email dan password diperlukan.' }), { status: 400 })
    }

    // Cek apakah email sudah ada
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Email sudah terdaftar.' }), { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Buat user baru dengan role admin
    const user = new User({
      email,
      password: hashedPassword,
      role: role || 'admin', // Pastikan role adalah admin
    })

    await user.save()

    return new Response(JSON.stringify({ message: 'Akun admin berhasil dibuat.' }), { status: 201 })
  } catch (error) {
    console.error('Register error:', error)
    return new Response(JSON.stringify({ message: 'Terjadi kesalahan saat mendaftar.' }), { status: 500 })
  }
}