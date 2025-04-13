import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  await connectDB()
  const { email, password } = await req.json()

  const user = await User.findOne({ email })
  if (!user) {
    return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 })
  }

  return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 })
}
