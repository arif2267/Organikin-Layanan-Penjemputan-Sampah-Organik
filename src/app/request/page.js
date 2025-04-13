'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RequestPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    description: '',
  })

  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail')
    if (!userEmail) {
      router.push('/login')
    } else {
      setEmail(userEmail)
    }
  }, [router])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, email })
    })

    if (res.ok) {
      alert('Permintaan berhasil dikirim!')
      router.push('/dashboard')
    } else {
      alert('Gagal mengirim permintaan.')
    }
  }

  return (
    <div className="min-h-screen bg-green-50 px-6 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">📝 Form Permintaan Penjemputan</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Nomor HP</label>
            <input
              type="text"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Alamat Lengkap</label>
            <textarea
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">Keterangan Tambahan (Opsional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 p-3 rounded-lg text-gray-800 focus:ring focus:ring-green-200 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-200"
          >
            Kirim Permintaan
          </button>
        </form>
      </div>
    </div>
  )
}
