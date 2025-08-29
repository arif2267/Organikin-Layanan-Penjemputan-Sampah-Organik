'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Leaf, Recycle, Truck, Users, Award, Clock, Shield, Star } from 'lucide-react'

export default function WhyOrganikin() {
  const features = [
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Ramah Lingkungan",
      description: "Mendukung gaya hidup berkelanjutan untuk masa depan yang lebih hijau"
    },
    {
      icon: <Recycle className="w-6 h-6" />,
      title: "Reduce Waste",
      description: "Mengurangi penumpukan sampah organik di lingkungan sekitar"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Pickup Service",
      description: "Penjemputan langsung ke rumah Anda dengan jadwal yang fleksibel"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Tim Lokal",
      description: "Dikelola oleh tim lokal yang peduli lingkungan dan komunitas"
    }
  ]

  const stats = [
    { number: "N/A", label: "Rumah Terlayani", icon: <Users className="w-5 h-5" /> },
    { number: "N/A", label: "Ton Sampah Organik", icon: <Recycle className="w-5 h-5" /> },
    { number: "12/7", label: "Customer Support", icon: <Clock className="w-5 h-5" /> },
    { number: "100%", label: "Eco-Friendly", icon: <Leaf className="w-5 h-5" /> }
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      comment: "Sangat membantu! Rumah jadi lebih bersih dan saya turut berkontribusi untuk lingkungan."
    },
    {
      name: "Budi S.",
      rating: 5,
      comment: "Pelayanan cepat dan profesional. Highly recommended!"
    },
    {
      name: "Rina K.",
      rating: 5,
      comment: "Organikin membuat pengelolaan sampah organik jadi mudah banget!"
    }
  ]

  return (
    <section id="tentang" className="py-20 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          {/* Image Section */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="relative">
              <Image
                src="/images/sampah-organik.jpg"
                alt="Ilustrasi sampah organik"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
              {/* Floating Badge */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}  
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span className="font-semibold text-sm"></span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-6"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Why Choose Us?
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
                Kenapa Harus 
                <span className="text-green-600"> Organikin</span>?
              </h2>
            </motion.div>

            <motion.p
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Organikin hadir sebagai solusi inovatif untuk mengelola sampah organik dengan cara yang mudah, 
              cepat, dan ramah lingkungan. Kami berkomitmen menciptakan lingkungan yang lebih bersih dan berkelanjutan.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Pencapaian Kami</h3>
            <p className="text-gray-600">Angka yang membuktikan komitmen kami</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-4"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Apa Kata Mereka?</h3>
          <p className="text-gray-600 mb-8">Testimoni dari pengguna yang telah merasakan manfaatnya</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">{`"Some text "with quotes" in it"`}</p>
                <div className="font-semibold text-gray-800">- {testimonial.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}