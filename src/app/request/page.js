'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../UserComponent/Header'
import Sidebar from '../UserComponent/Sidebar'

export default function RequestPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    description: '',
  })

  const [email, setEmail] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
  }, [router])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
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
    } catch (error) {
      console.error('Error:', error)
      alert('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
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
          <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-green-800 mb-2">Buat Permintaan</h1>
              <p className="text-gray-600">Isi formulir di bawah ini untuk membuat permintaan penjemputan sampah</p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Form Permintaan Penjemputan</h2>
                  <p className="text-sm text-gray-600">Lengkapi data dengan benar untuk memudahkan proses penjemputan</p>
                </div>
              </div>

              {/* Info Alert */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-green-800 mb-1">Informasi Penting:</p>
                    <p className="text-green-700">Pastikan sampah organik sudah dipisahkan dengan baik sebelum dijemput oleh tim kami.</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nama Lengkap */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                {/* Nomor HP */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor HP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="Contoh: 08123456789"
                  />
                </div>

                {/* Alamat Lengkap */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={4}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors resize-none"
                    placeholder="Masukkan alamat lengkap termasuk RT/RW, kelurahan, kecamatan"
                  />
                </div>

                {/* Keterangan Tambahan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keterangan Tambahan
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-colors resize-none"
                    placeholder="Informasi tambahan yang membantu proses penjemputan (opsional)"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium transition duration-200 ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Mengirim...
                      </div>
                    ) : (
                      'Kirim Permintaan'
                    )}
                  </button>
                </div>
              </form>

              {/* Help Text */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  Setelah mengirim permintaan, Anda akan menerima konfirmasi melalui WhatsApp atau telepon dari tim kami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}