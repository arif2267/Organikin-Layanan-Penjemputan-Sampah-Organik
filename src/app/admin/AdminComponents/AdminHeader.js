'use client'

import { useRouter } from 'next/navigation'

export default function AdminHeader({ email }) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userRole')
    router.push('/login')
  }

  return (
    <header className="bg-white shadow-md border-b border-green-200">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🌱</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-green-700">Organikin Admin</h1>
            <p className="text-sm text-gray-600">Panel Administrasi</p>
          </div>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center space-x-4">

          {/* User Profile */}
          <div className="flex items-center space-x-3 bg-green-50 px-4 py-2 rounded-lg">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">
                {email ? email.charAt(0).toUpperCase() : 'A'}
              </span>
            </div>
            <div className="text-sm">
              <p className="font-medium text-green-800">Admin</p>
              <p className="text-gray-600 text-xs">{email}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 flex items-center space-x-2"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}