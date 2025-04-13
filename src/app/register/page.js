'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    setMessage(data.message)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-700">Daftar Akun Organikin</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded text-gray-800 placeholder:text-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded text-gray-800 placeholder:text-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Daftar
          </button>
          {message && <p className="text-center text-sm text-red-500">{message}</p>}
        </form>

        <p className="text-sm text-center mt-4">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-green-600 hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  )
}
