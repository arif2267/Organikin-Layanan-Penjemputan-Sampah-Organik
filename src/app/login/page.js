'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('userEmail', email)
        localStorage.setItem('userRole', data.role) // Simpan role dari API
        console.log('Login successful, role:', data.role) // Debugging

        // Redirect berdasarkan role
        window.location.href = data.role === 'admin' ? '/admin/dashboard' : '/dashboard'
      } else {
        setMessage(data.message || 'Login gagal.')
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage('Terjadi kesalahan saat login.')
    }
  }

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-4">
      {/* Back to Home Button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 text-green-700 hover:text-green-800 transition-colors duration-200 flex items-center gap-2 font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Beranda
      </Link>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-green-200">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Organikin</h1>
          <p className="text-gray-600 text-sm">Masuk ke akun Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Masukkan password Anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
          >
            Masuk
          </button>
          
          {message && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {message}
            </div>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun?{' '}
            <Link href="/register" className="text-green-600 hover:text-green-700 font-medium hover:underline transition-colors">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}