'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      name: 'Beranda',
      href: '/admin/dashboard',
      icon: '🏠',
      description: 'Dashboard Utama'
    },
    {
      name: 'Riwayat Permintaan',
      href: '/admin/requests',
      icon: '📋',
      description: 'Riwayat Permintaan Pengguna'
    }
  ]

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-green-200 min-h-screen">
      <div className="p-6">
        {/* Sidebar Header */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-green-700 mb-2">Menu Navigasi</h2>
          <div className="w-full h-px bg-green-200"></div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block w-full p-4 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-green-100 border-l-4 border-green-600 text-green-700'
                    : 'hover:bg-green-50 text-gray-700 hover:text-green-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`text-xl ${isActive ? 'scale-110' : 'group-hover:scale-105'} transition-transform`}>
                    {item.icon}
                  </span>
                  <div>
                    <p className={`font-medium ${isActive ? 'text-green-700' : 'text-gray-800'}`}>
                      {item.name}
                    </p>
                    <p className={`text-xs ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
                
                {isActive && (
                  <div className="mt-2 ml-8">
                    <div className="w-6 h-px bg-green-400"></div>
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}