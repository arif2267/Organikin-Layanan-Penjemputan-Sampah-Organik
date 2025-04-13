'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminRequestPage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    const role = localStorage.getItem('userRole')

    if (!email || role !== 'admin') {
      router.push('/login')
      return
    }

    const fetchAllRequests = async () => {
      const res = await fetch('/api/admin/all')
      const data = await res.json()
      setRequests(data)
      setLoading(false)
    }

    fetchAllRequests()
  }, [router])

  const handleConfirm = async (id) => {
    const res = await fetch('/api/admin/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'Dikonfirmasi' })
    })

    if (res.ok) {
      const updated = await res.json()
      setRequests(requests.map(r => (r._id === updated._id ? updated : r)))
    } else {
      alert('Gagal mengonfirmasi permintaan.')
    }
  }

  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">📋 Daftar Permintaan Pengguna</h1>

        {loading ? (
          <p>Memuat data...</p>
        ) : requests.length === 0 ? (
          <p className="text-gray-600">Belum ada permintaan yang tercatat.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <li key={req._id} className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold text-green-800">{req.name}</p>
                    <p className="text-sm text-gray-700 mb-1">📧 {req.email} | 📱 {req.phone}</p>
                    <p className="text-sm text-gray-700 mb-1">🏠 {req.address}</p>
                    {req.description && <p className="text-sm text-gray-600 italic">"{req.description}"</p>}
                    <p className="text-sm text-gray-500 mt-1">🕒 {new Date(req.createdAt).toLocaleString()}</p>
                    <p className={`text-sm font-medium mt-1 ${req.status === 'Dikonfirmasi' ? 'text-green-600' : 'text-yellow-600'}`}>
                      Status: {req.status}
                    </p>
                  </div>
                  {req.status !== 'Dikonfirmasi' && (
                    <button
                      onClick={() => handleConfirm(req._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                      Konfirmasi
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
