'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero({ id = 'beranda' }) {
  return (
    <section
      id={id}
      className="bg-green-100 py-24 px-6 flex flex-col md:flex-row items-center justify-between"
    >
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-bold text-green-800"
        >
          Organikin
        </motion.h1>

        <motion.p
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg md:text-xl text-gray-700"
        >
          Solusi penjemputan sampah organik langsung dari rumah Anda. Mudah, cepat, dan ramah lingkungan!
        </motion.p>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex gap-4 justify-center md:justify-start"
        >
          <Link href="/register">
            <button className="bg-green-600 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition">
              Mulai Sekarang
            </button>
          </Link>
          <Link href="/login">
            <button className="border border-green-600 text-green-700 px-6 py-3 rounded-full text-lg hover:bg-green-200 transition">
              Login
            </button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="md:w-1/2 mt-10 md:mt-0 flex justify-center"
      >
        <Image
          src="/images/hero-animation.gif"
          alt="Hero animation"
          width={400}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </motion.div>
    </section>
  )
}
