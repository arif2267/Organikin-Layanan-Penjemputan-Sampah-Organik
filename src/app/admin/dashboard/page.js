'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminHeader from '../AdminComponents/AdminHeader'
import AdminSidebar from '../AdminComponents/AdminSidebar'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts'

export default function AdminDashboard() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    const role = localStorage.getItem('userRole')

    if (!email || role !== 'admin') {
      router.replace('/login')
    } else {
      setEmail(email)
      setCheckingAuth(false)

      const fetchRequests = async () => {
        try {
          const res = await fetch('/api/admin/all')
          if (!res.ok) throw new Error('Gagal fetch data')
          const data = await res.json()
          setRequests(data)
        } catch (error) {
          console.error('Gagal mengambil data permintaan:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchRequests()
    }
  }, [router])

  // Fungsi untuk mengubah status
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch('/api/admin/confirm', {
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

  // Data processing untuk grafik
  const getStatusCounts = () => {
    return {
      waiting: requests.filter(req => req.status === 'Menunggu Konfirmasi').length,
      processing: requests.filter(req => req.status === 'Diproses').length,
      completed: requests.filter(req => req.status === 'Selesai').length
    }
  }

  // Data untuk Pie Chart
  const getPieChartData = () => {
    const counts = getStatusCounts()
    return [
      { name: 'Menunggu', value: counts.waiting, color: '#F59E0B' },
      { name: 'Diproses', value: counts.processing, color: '#3B82F6' },
      { name: 'Selesai', value: counts.completed, color: '#10B981' }
    ]
  }

  // Data untuk Line Chart (7 hari terakhir)
  const getWeeklyTrendData = () => {
    const last7Days = []
    const today = new Date()
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const requestsOnDate = requests.filter(req => {
        const reqDate = new Date(req.createdAt).toISOString().split('T')[0]
        return reqDate === dateStr
      }).length

      last7Days.push({
        date: date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
        fullDate: dateStr,
        permintaan: requestsOnDate
      })
    }
    
    return last7Days
  }

  // Data untuk Area Chart (Bulanan)
  const getMonthlyData = () => {
    const monthlyData = {}
    requests.forEach(req => {
      const month = new Date(req.createdAt).toLocaleDateString('id-ID', { 
        year: 'numeric', 
        month: 'short' 
      })
      monthlyData[month] = (monthlyData[month] || 0) + 1
    })

    return Object.entries(monthlyData)
      .map(([month, total]) => ({ month, total }))
      .slice(-6) // 6 bulan terakhir
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
  const pieData = getPieChartData()
  const weeklyData = getWeeklyTrendData()
  const monthlyData = getMonthlyData()

  // Custom tooltip untuk grafik
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm text-gray-600">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-green-50 flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <AdminHeader email={email} />
        
        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">

            {/* Statistik Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-yellow-800 mb-1">Menunggu Konfirmasi</h2>
                    <p className="text-3xl font-bold text-yellow-700">{counts.waiting}</p>
                    <p className="text-sm text-yellow-600 mt-1">Permintaan baru</p>
                  </div>
                  <div className="text-4xl text-yellow-500">⏳</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-800 mb-1">Diproses</h2>
                    <p className="text-3xl font-bold text-blue-700">{counts.processing}</p>
                    <p className="text-sm text-blue-600 mt-1">Sedang ditangani</p>
                  </div>
                  <div className="text-4xl text-blue-500">🚚</div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-green-800 mb-1">Selesai</h2>
                    <p className="text-3xl font-bold text-green-700">{counts.completed}</p>
                    <p className="text-sm text-green-600 mt-1">Telah diselesaikan</p>
                  </div>
                  <div className="text-4xl text-green-500">✅</div>
                </div>
              </div>
            </div>

            {/* Charts Section - Custom Layout per Sketsa */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Line Chart - Weekly Trend (Left Side, Larger) */}
              <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-green-700 mb-4">📊 Tren 7 Hari Terakhir</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="permintaan" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Right Side Charts Container */}
              <div className="lg:col-span-1 space-y-6">
                {/* Pie Chart - Status Distribution (Top Right) */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-bold text-green-700 mb-4">📈 Status</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Area Chart - Monthly Trend (Bottom Right) */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-bold text-green-700 mb-4">📅 Tren Bulanan</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#10B981" 
                        fill="#10B981" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Requests Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-green-700">📋 Permintaan Terbaru</h2>
                <button 
                  onClick={() => router.push('/admin/requests')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 text-sm"
                >
                  Lihat Semua
                </button>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Memuat data...</p>
                </div>
              ) : requests.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-gray-600">Belum ada permintaan yang tercatat.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.slice(0, 3).map((req) => {
                    const getStatusStyle = (status) => {
                      switch (status) {
                        case 'Menunggu Konfirmasi':
                          return { textColor: 'text-yellow-600', icon: '⏳' }
                        case 'Diproses':
                          return { textColor: 'text-blue-600', icon: '🚚' }
                        case 'Selesai':
                          return { textColor: 'text-green-600', icon: '✅' }
                        default:
                          return { textColor: 'text-gray-600', icon: '❓' }
                      }
                    }

                    const { textColor, icon } = getStatusStyle(req.status)
                    return (
                      <div key={req._id} className="border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-green-800">{req.name}</h3>
                              <span className={`text-sm font-medium px-2 py-1 rounded-full ${textColor} bg-opacity-20 flex items-center space-x-1`}>
                                <span>{icon}</span>
                                <span>{req.status}</span>
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                              <p>📧 {req.email}</p>
                              <p>📱 {req.phone}</p>
                              <p>🏠 {req.address}</p>
                              <p>🗑️ {req.wasteType || 'Tidak ditentukan'}</p>
                            </div>
                            
                            <p className="text-xs text-gray-500">
                              🕒 {new Date(req.createdAt).toLocaleString('id-ID')}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2 ml-4">
                            {req.status === 'Menunggu Konfirmasi' && (
                              <button
                                onClick={() => updateStatus(req._id, 'Diproses')}
                                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                              >
                                Konfirmasi
                              </button>
                            )}
                            {req.status === 'Diproses' && (
                              <button
                                onClick={() => updateStatus(req._id, 'Selesai')}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
                              >
                                Selesaikan
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  
                  {requests.length > 3 && (
                    <div className="text-center pt-4">
                      <p className="text-sm text-gray-600">
                        Menampilkan 3 dari {requests.length} permintaan.
                        <button 
                          onClick={() => router.push('/admin/requests')}
                          className="text-green-600 hover:text-green-700 ml-1 underline"
                        >
                          Lihat semua
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}