import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Permintaan Berhasil Dikirim! 🌿</h1>
        <p className="text-gray-700 mb-6">
          Tim penjemput akan segera menghubungi Anda untuk konfirmasi.
          Terima kasih telah berpartisipasi menjaga lingkungan!
        </p>
        <Link href="/dashboard">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Kembali ke Dashboard
          </button>
        </Link>
      </div>
    </div>
  )
}
