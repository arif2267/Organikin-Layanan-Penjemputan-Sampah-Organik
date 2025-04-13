import Image from 'next/image'

export default function FeatureCard() {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden flex flex-col lg:flex-row items-center p-6 lg:p-10 my-6">
      {/* Text Section */}
      <div className="lg:w-1/2 mb-6 lg:mb-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            {/* Ganti dengan ikon sesuai kebutuhan */}
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 3a1 1 0 011-1h3a1 1 0 010 2H5v11h10V4h-2a1 1 0 110-2h3a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V3z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-800">Pick Up</h2>
        </div>
        <p className="text-gray-700 text-base">
          Foto sampah organikmu, upload lewat Organikin. Kolektor terdekat akan menjemput, menimbang, dan mencatat penjemputan untuk diproses lebih lanjut.
        </p>
      </div>

      {/* Image Section */}
      <div className="lg:w-1/2 relative w-full h-64 lg:h-80">
        <Image
          src="/images/pickup.jpeg" // Pastikan file disimpan di /public/image/pickup.jpg
          alt="Pick Up"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
    </div>
  )
}
