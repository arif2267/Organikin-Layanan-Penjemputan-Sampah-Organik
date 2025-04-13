'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function WhyOrganikin() {
  return (
    <section
      id="tentang"
      className="py-16 px-6 bg-white flex flex-col md:flex-row items-center gap-8"
    >
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="md:w-1/2"
      >
        <Image
          src="/images/sampah-organik.jpg"
          alt="Ilustrasi sampah organik"
          width={500}
          height={350}
          className="rounded-xl shadow"
        />
      </motion.div>

      <motion.div
        initial={{ x: 60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="md:w-1/2"
      >
        <motion.h3
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-bold mb-4"
          style={{ color: '#945034' }}
        >
          Kenapa Harus Organikin?
        </motion.h3>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-4 text-gray-700"
        >
          Organikin hadir untuk membantu masyarakat mengelola sampah organik dengan mudah, cepat, dan ramah lingkungan.
        </motion.p>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="list-disc pl-6 text-gray-600 space-y-2"
        >
          <li>Mendukung gaya hidup berkelanjutan</li>
          <li>Mengurangi penumpukan sampah di lingkungan</li>
          <li>Penjemputan langsung ke rumah Anda</li>
          <li>Dikelola oleh tim lokal yang peduli lingkungan</li>
        </motion.ul>
      </motion.div>
    </section>
  )
}
