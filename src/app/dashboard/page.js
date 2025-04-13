import Image from 'next/image'

export default function DashboardPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-800 mb-10">Cara Pakai</h1>
      <div className="flex flex-col lg:flex-row items-start gap-12">
        {/* Langkah-langkah */}
        <div className="flex-1 space-y-6">
          {/* Langkah 1 dengan box hijau */}
          <div className="bg-green-600 rounded-lg p-6 text-white space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-white text-green-700 font-bold w-7 h-7 flex items-center justify-center rounded-full">1</div>
              <h2 className="text-lg font-semibold">Pilah Sampah</h2>
            </div>
            <ul className="text-sm ml-10 list-decimal">
              <li>Pastikan sampah yang dipisahkan adalah jenis sampah organik</li>
            </ul>
          </div>

          {/* Langkah 2 sampai 5 */}
          {[
            'Isi Formulir Penjemputan',
            'setelah Formulir dikirim Akan Muncul Status Menunggu Konfirmasi',
            'Admin akan mengkonfirmasi Penjemputan',
            'status akan berubah menjadi status dikonfirmasi'
          ].map((text, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="bg-green-600 text-white font-bold w-7 h-7 flex items-center justify-center rounded-full">{idx + 2}</div>
              <p className="text-green-900 font-medium">{text}</p>
            </div>
          ))}
        </div>

        {/* Gambar HP */}
        <div className="flex-1 relative w-full lg:w-[400px] h-[500px]">
          <Image
            src="/images/pickup-step.png"
            alt="Cara Pakai"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </section>
  )
}
