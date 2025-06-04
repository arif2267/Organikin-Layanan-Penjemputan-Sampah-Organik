'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Hero({ id = 'beranda' }) {
  return (
    <section
      id={id}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/green_economy.jpg"
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay untuk memastikan text terbaca */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          
          {/* Main Title */}
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl"
          >
            Organikin
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-xl md:text-2xl lg:text-3xl text-white/90 font-medium drop-shadow-lg max-w-3xl mx-auto leading-relaxed"
          >
            Solusi penjemputan sampah organik langsung dari rumah Anda. 
            <br className="hidden md:block" />
            Mudah, cepat, dan ramah lingkungan!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <Link href="/register">
              <button className="
                bg-green-600 hover:bg-green-500 
                text-white px-8 py-4 rounded-full 
                text-lg md:text-xl font-semibold
                shadow-2xl shadow-green-600/30
                transition-all duration-300 
                hover:scale-105 hover:shadow-green-500/40
                active:scale-95
                backdrop-blur-sm
                border border-white/10
                min-w-[200px]
              ">
                Mulai Sekarang
              </button>
            </Link>
            
            <Link href="/login">
              <button className="
                bg-white/10 hover:bg-white/20
                text-white border-2 border-white/30 hover:border-white/50
                px-8 py-4 rounded-full 
                text-lg md:text-xl font-semibold
                backdrop-blur-md
                transition-all duration-300 
                hover:scale-105 hover:shadow-xl hover:shadow-white/20
                active:scale-95
                min-w-[200px]
              ">
                Login
              </button>
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300">
              <span className="text-sm font-medium mb-2">Scroll</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 border border-white/50 rounded-full flex justify-center"
              >
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
