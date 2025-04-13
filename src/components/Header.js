import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-2xl font-extrabold">Organikin</h1>
      <nav className="space-x-6 text-lg font-semibold">
        <Link href="#beranda" className="hover:underline">Beranda</Link>
        <Link href="#tentang" className="hover:underline">Tentang</Link>
        <Link href="#jenis-sampah" className="hover:underline">Jenis Sampah</Link>
        <Link href="/login" className="hover:underline">Masuk</Link>
      </nav>
    </header>
  )
}
