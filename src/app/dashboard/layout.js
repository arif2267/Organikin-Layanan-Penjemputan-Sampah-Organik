// src/app/dashboard/layout.js (atau layout.tsx)
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    if (!email) {
      router.push('/login')
    } else {
      setUserEmail(email)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('userEmail')
    router.push('/')
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md px-6 py-10 rounded-r-3xl">
        <h2 className="text-2xl font-bold text-green-700 mb-10">Organikin</h2>
        <nav className="space-y-4">
          <NavItem href="/dashboard" label="Dashboard" />
          <NavItem href="/request" label="Buat Permintaan" />
          <NavItem href="/history" label="Riwayat" />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-10 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-green-700">Selamat datang, {userEmail}</h1>
            <p className="text-sm text-gray-600">Kelola permintaan sampah organik Anda</p>
          </div>
          <button
            onClick={logout}
            className="text-red-600 hover:underline text-sm"
          >
            Logout
          </button>
        </div>

        {/* Page content */}
        {children}
      </main>
    </div>
  )
}

function NavItem({ href, label }) {
  return (
    <Link href={href}>
      <div className="text-green-700 hover:bg-green-100 px-4 py-2 rounded-lg transition cursor-pointer">
        {label}
      </div>
    </Link>
  )
}
