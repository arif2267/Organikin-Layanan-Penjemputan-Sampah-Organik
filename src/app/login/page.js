'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('userEmail', email)
        localStorage.setItem('userRole', role)

        window.location.href = role === 'admin' ? '/admin/requests' : '/dashboard'
      } else {
        setMessage(data.message || 'Login gagal.')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Terjadi kesalahan saat login.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-700">Login Organikin</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded text-gray-800 placeholder:text-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded text-gray-800 placeholder:text-gray-500"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-3 border border-gray-300 rounded text-gray-800"
          >
            <option value="user">Sebagai User</option>
            <option value="admin">Sebagai Admin</option>
          </select>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Login
          </button>
          {message && <p className="text-center text-sm text-red-500">{message}</p>}
        </form>

        <p className="text-sm text-center mt-4">
          Belum punya akun?{' '}
          <Link href="/register" className="text-green-800 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  )
}
