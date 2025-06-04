'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '../AdminComponents/AdminHeader'
import AdminSidebar from '../AdminComponents/AdminSidebar'

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [email, setEmail] = useState('')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    const role = localStorage.getItem('userRole')

    if (!email || role !== 'admin') {
      router.push('/login')
      return
    } else {
      setEmail(email)
      setCheckingAuth(false)
    }

    const fetchAllRequests = async () => {
      try {
        const res = await fetch('/api/admin/all')
        const data = await res.json()
        setRequests(data)
      } catch (error) {
        console.error('Gagal mengambil data permintaan:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllRequests()
  }, [router])

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch('/api/admin/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      })

      if (res.ok) {
        const updated = await res.json()
        setRequests(requests.map(r => (r._id === updated._id ? updated : r)))
        alert('Status berhasil diperbarui!')
      } else {
        alert('Gagal memperbarui status.')
      }
    } catch (error) {
      console.error(error)
      alert('Terjadi kesalahan saat memperbarui status.')
    }
  }

  // Fungsi untuk menentukan warna dan ikon berdasarkan status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Menunggu Konfirmasi':
        return { 
          textColor: 'text-yellow-600', 
          bgColor: 'bg-yellow-100', 
          borderColor: 'border-yellow-200',
          icon: '⏳' 
        }
      case 'Diproses':
        return { 
          textColor: 'text-blue-600', 
          bgColor: 'bg-blue-100', 
          borderColor: 'border-blue-200',
          icon: '🚚' 
        }
      case 'Selesai':
        return { 
          textColor: 'text-green-600', 
          bgColor: 'bg-green-100', 
          borderColor: 'border-green-200',
          icon: '✅' 
        }
      default:
        return { 
          textColor: 'text-gray-600', 
          bgColor: 'bg-gray-100', 
          borderColor: 'border-gray-200',
          icon: '❓' 
        }
    }
  }

  // Filter dan pencarian
  const filteredRequests = requests.filter(req => {
    const matchesFilter = filter === 'all' || req.status === filter
    const matchesSearch = searchTerm === '' || 
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.phone.includes(searchTerm) ||
      req.address.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  // Menghitung statistik
  const getStatusCounts = () => {
    return {
      all: requests.length,
      waiting: requests.filter(req => req.status === 'Menunggu Konfirmasi').length,
      processing: requests.filter(req => req.status === 'Diproses').length,
      completed: requests.filter(req => req.status === 'Selesai').length
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-green-700">Memeriksa otentikasi...</p>
        </div>
      </div>
    )
  }

  const counts = getStatusCounts()

  return (
    <div className="min-h-screen bg-green-50 flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader email={email} />
        
        {/* Requests Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Filter dan Search */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Filter Tabs */}
                <div className="flex space-x-2">
                  {[
                    { key: 'all', label: 'Semua', count: counts.all },
                    { key: 'Menunggu Konfirmasi', label: 'Menunggu', count: counts.waiting },
                    { key: 'Diproses', label: 'Diproses', count: counts.processing },
                    { key: 'Selesai', label: 'Selesai', count: counts.completed }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setFilter(tab.key)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filter === tab.key
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tab.label} ({tab.count})
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari nama, email, atau alamat..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Menampilkan {filteredRequests.length} dari {requests.length} permintaan
              </p>
            </div>

            {/* Requests List */}
            <div className="bg-white rounded-xl shadow-md">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Memuat data permintaan...</p>
                </div>
              ) : filteredRequests.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    {requests.length === 0 ? 'Belum ada permintaan' : 'Tidak ada hasil'}
                  </h3>
                  <p className="text-gray-500">
                    {requests.length === 0 
                      ? 'Belum ada permintaan yang tercatat dalam sistem.'
                      : 'Coba ubah filter atau kata kunci pencarian Anda.'
                    }
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredRequests.map((req) => {
                    const { textColor, bgColor, borderColor, icon } = getStatusStyle(req.status)
                    return (
                      <div key={req._id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            {/* Header dengan nama dan status */}
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-xl font-semibold text-green-800">{req.name}</h3>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor} ${borderColor} border`}>
                                <span className="mr-1">{icon}</span>
                                {req.status}
                              </span>
                            </div>
                            
                            {/* Detail informasi */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-400">📧</span>
                                <span className="text-gray-700">{req.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-400">📱</span>
                                <span className="text-gray-700">{req.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-400">🏠</span>
                                <span className="text-gray-700">{req.address}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-gray-400">🗑️</span>
                                <span className="text-gray-700">{req.wasteType || 'Tidak ditentukan'}</span>
                              </div>
                            </div>
                            
                            {/* Deskripsi */}
                            {req.description && (
                              <div className="mb-3">
                                <p className="text-sm text-gray-600 italic bg-gray-50 p-3 rounded-lg">
                                  "{req.description}"
                                </p>
                              </div>
                            )}
                            
                            {/* Timestamp */}
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>🕒</span>
                              <span>Dibuat: {new Date(req.createdAt).toLocaleString('id-ID')}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col space-y-2 ml-6">
                            {req.status === 'Menunggu Konfirmasi' && (
                              <button
                                onClick={() => updateStatus(req._id, 'Diproses')}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-sm whitespace-nowrap"
                              >
                                ✅ Konfirmasi
                              </button>
                            )}
                            {req.status === 'Diproses' && (
                              <button
                                onClick={() => updateStatus(req._id, 'Selesai')}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 text-sm whitespace-nowrap"
                              >
                                🏁 Selesaikan
                              </button>
                            )}
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
    </div>
  )
}