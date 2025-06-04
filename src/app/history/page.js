'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../UserComponent/Header'
import Sidebar from '../UserComponent/Sidebar'

export default function HistoryPage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail')
    const userRole = localStorage.getItem('userRole')

    // Jika tidak ada userEmail, redirect ke login
    if (!userEmail) {
      router.push('/login')
      return
    }

    // Jika role adalah admin, redirect ke /admin/dashboard
    if (userRole === 'admin') {
      router.push('/admin/dashboard')
      return
    }

    // Jika role bukan user, redirect ke login
    if (userRole !== 'user') {
      router.push('/login')
      return
    }

    setEmail(userEmail)

    const fetchRequests = async () => {
      try {
        const res = await fetch('/api/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail })
        })

        const data = await res.json()
        setRequests(data)
      } catch (error) {
        console.error('Gagal mengambil data riwayat:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [router])

  // Fungsi untuk menentukan warna dan ikon berdasarkan status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Menunggu Konfirmasi':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          icon: '⏳'
        }
      case 'Sedang Diproses':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          icon: '🚚'
        }
      case 'Selesai':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: '✅'
        }
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: '🚚'
        }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header 
        email={email} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Sidebar */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* Main Content */}
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {/* Summary Card */}
            {requests.length > 0 && (
              <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Ringkasan</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {requests.length}
                    </div>
                    <div className="text-sm text-green-700">Total Permintaan</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {requests.filter(req => req.status === 'Menunggu Konfirmasi').length}
                    </div>
                    <div className="text-sm text-yellow-700">Menunggu Konfirmasi</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {requests.filter(req => req.status === 'Selesai').length}
                    </div>
                    <div className="text-sm text-green-700">Selesai</div>
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                  <span className="text-gray-600">Memuat data...</span>
                </div>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada permintaan</h3>
                <p className="text-gray-600 mb-6">Belum ada permintaan yang tercatat.</p>
                <button
                  onClick={() => router.push('/request')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200"
                >
                  Buat Permintaan Pertama
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((req, index) => {
                  const { bgColor, textColor, icon } = getStatusStyle(req.status)
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {req.name} - {req.phone}
                          </h3>
                          <p className="text-gray-600 mb-2">{req.address}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(req.createdAt).toLocaleString('id-ID', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <span className={`${bgColor} ${textColor} px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2`}>
                            <span>{icon}</span>
                            <span>Status: {req.status}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}