'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HistoryPage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem('userEmail')

    if (!email) {
      router.push('/login')
      return
    }

    const fetchRequests = async () => {
      try {
        const res = await fetch('/api/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
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

  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6">📦 Riwayat Permintaan Anda</h1>

        {loading ? (
          <p>Memuat data...</p>
        ) : requests.length === 0 ? (
          <p className="text-gray-600">Belum ada permintaan yang tercatat.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req, index) => (
              <li key={index} className="bg-white p-4 rounded-xl shadow">
                <p className="font-semibold text-green-800">{req.name} - {req.phone}</p>
                <p className="text-gray-700 text-sm">{req.address}</p>
                <p className="text-sm text-gray-500">{new Date(req.createdAt).toLocaleString()}</p>
                <p className="text-sm font-medium text-green-600 mt-1">Status: {req.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
