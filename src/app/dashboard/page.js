'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../UserComponent/Header'
import Sidebar from '../UserComponent/Sidebar'

export default function DashboardPage() {
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
  }, [router])

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
          <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-green-800 mb-2">Cara Pakai</h1>
              <p className="text-gray-600">Panduan langkah demi langkah untuk menggunakan layanan penjemputan sampah</p>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-12">
              {/* Langkah-langkah */}
              <div className="flex-1 space-y-6">
                {/* Langkah 1 dengan box hijau */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white text-green-700 font-bold w-10 h-10 flex items-center justify-center rounded-full text-sm shadow-md">1</div>
                    <h2 className="text-xl font-semibold">Pilah Sampah</h2>
                  </div>
                  <div className="ml-13">
                    <p className="text-green-50 mb-2">Langkah pertama yang penting:</p>
                    <ul className="text-sm space-y-1 text-green-100">
                      <li className="flex items-start gap-2">
                        <span className="text-green-300 mt-1">•</span>
                        <span>Pastikan sampah yang dipisahkan adalah jenis sampah organik</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Langkah 2 sampai 5 */}
                {[
                  {
                    title: 'Isi Formulir Penjemputan',
                    desc: 'Lengkapi form dengan data yang akurat'
                  },
                  {
                    title: 'Menunggu Konfirmasi',
                    desc: 'Status akan muncul "Menunggu Konfirmasi" di dashboard'
                  },
                  {
                    title: 'Admin Konfirmasi',
                    desc: 'Tim kami akan mengkonfirmasi jadwal penjemputan'
                  },
                  {
                    title: 'Status Dikonfirmasi',
                    desc: 'Anda akan mendapat notifikasi konfirmasi jadwal'
                  }
                ].map((step, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-600 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full text-sm flex-shrink-0 shadow-md">
                        {idx + 2}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-green-900 font-semibold text-lg mb-1">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gambar HP */}
              <div className="flex-1 lg:max-w-md">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Preview Aplikasi</h3>
                    <p className="text-sm text-gray-600">Tampilan Form permintaan Penjemputan</p>
                  </div>
                  <div className="relative w-full h-[500px] bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src="/images/pickup-step.png"
                      alt="Cara Pakai - Preview Aplikasi"
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="mt-12 bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Informasi Penting</h3>
                  <p className="text-green-700 text-sm leading-relaxed">
                    Pastikan Anda sudah memilah sampah dengan benar sebelum membuat permintaan penjemputan. 
                    Tim kami hanya melayani penjemputan sampah organik yang sudah dipisahkan dengan baik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}