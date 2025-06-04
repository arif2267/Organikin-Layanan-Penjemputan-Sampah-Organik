'use client';

import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, Apple, Soup, Trash2, Droplet, Pizza, 
  X, CheckCircle, Clock, Recycle, Info, 
  ArrowRight, Sparkles, TreePine 
} from 'lucide-react';

const categories = [
  {
    title: "Sisa Makanan",
    color: "from-orange-400 to-red-500",
    items: [
      {
        icon: <Apple className="w-8 h-8" />,
        name: 'Sisa Makanan',
        category: 'Mudah Terurai',
        processingTime: '2-4 minggu',
        compostValue: 'Tinggi',
        description: 'Sisa makanan seperti nasi, sayur, buah yang membusuk termasuk sampah organik dan dapat dijadikan kompos berkualitas tinggi dengan kandungan nutrisi yang baik untuk tanaman.',
        tips: [
          'Pisahkan dari bumbu dan garam berlebih',
          'Potong kecil-kecil untuk mempercepat penguraian',
          'Hindari makanan berminyak berlebihan'
        ],
        benefits: ['Kompos berkualitas tinggi', 'Kaya nutrisi', 'Mudah terurai'],
        difficulty: 'easy'
      },
      {
        icon: <Pizza className="w-8 h-8" />,
        name: 'Tulang & Daging Busuk',
        category: 'Perlu Perlakuan Khusus',
        processingTime: '2-3 bulan',
        compostValue: 'Sedang',
        description: 'Meskipun perlu perlakuan khusus, tulang dan daging busuk juga termasuk sampah organik yang dapat diolah menjadi kompos dengan metode yang tepat.',
        tips: [
          'Perlu pengolahan dengan suhu tinggi',
          'Campurkan dengan bahan karbon tinggi',
          'Proses membutuhkan waktu lebih lama'
        ],
        benefits: ['Sumber protein untuk kompos', 'Nutrisi lengkap', 'Zero waste'],
        difficulty: 'hard'
      }
    ]
  },
  {
    title: "Limbah Dapur",
    color: "from-brown-400 to-amber-600",
    items: [
      {
        icon: <Soup className="w-8 h-8" />,
        name: 'Ampas Kopi & Teh',
        category: 'Mudah Terurai',
        processingTime: '3-6 minggu',
        compostValue: 'Tinggi',
        description: 'Ampas kopi dan teh kaya akan nitrogen dan dapat digunakan langsung sebagai pupuk atau campuran kompos alami yang sangat bermanfaat.',
        tips: [
          'Keringkan terlebih dahulu sebelum kompos',
          'Campurkan dengan bahan kering lainnya',
          'Bisa langsung ditaburkan ke tanaman'
        ],
        benefits: ['Kaya nitrogen', 'Natural pest repellent', 'Mudah digunakan'],
        difficulty: 'easy'
      },
      {
        icon: <Droplet className="w-8 h-8" />,
        name: 'Minyak Jelantah',
        category: 'Perlu Pengolahan Khusus',
        processingTime: 'Instant',
        compostValue: 'Rendah',
        description: 'Minyak goreng bekas bisa dikumpulkan untuk diolah kembali menjadi biodiesel atau sabun ramah lingkungan.',
        tips: [
          'Saring terlebih dahulu dari kotoran',
          'Simpan dalam wadah tertutup',
          'Jangan campurkan dengan kompos biasa'
        ],
        benefits: ['Dapat didaur ulang', 'Biodiesel alternative', 'Bahan sabun alami'],
        difficulty: 'medium'
      }
    ]
  },
  {
    title: "Limbah Kebun",
    color: "from-green-400 to-emerald-600",
    items: [
      {
        icon: <Leaf className="w-8 h-8" />,
        name: 'Daun & Rumput',
        category: 'Mudah Terurai',
        processingTime: '4-8 minggu',
        compostValue: 'Tinggi',
        description: 'Daun dan rumput kering kaya akan karbon dan dapat diolah menjadi kompos berkualitas atau bahan bakar alami yang ramah lingkungan.',
        tips: [
          'Campurkan daun kering dan basah',
          'Cacah untuk mempercepat penguraian',
          'Ideal sebagai bahan karbon dalam kompos'
        ],
        benefits: ['Sumber karbon tinggi', 'Struktur kompos yang baik', 'Mengurangi limbah kebun'],
        difficulty: 'easy'
      },
      {
        icon: <Trash2 className="w-8 h-8" />,
        name: 'Kulit Buah',
        category: 'Sangat Mudah Terurai',
        processingTime: '1-3 minggu',
        compostValue: 'Tinggi',
        description: 'Kulit buah seperti pisang, jeruk, dan mangga sangat mudah terurai dan cocok untuk kompos dengan kandungan vitamin dan mineral yang tinggi.',
        tips: [
          'Potong kecil untuk mempercepat proses',
          'Campurkan berbagai jenis kulit buah',
          'Hindari kulit buah yang diberi pestisida'
        ],
        benefits: ['Kaya vitamin dan mineral', 'Cepat terurai', 'Aroma kompos yang baik'],
        difficulty: 'easy'
      }
    ]
  }
];

const stats = [
  { number: "85%", label: "Sampah Organik dari Total Sampah", icon: <Recycle className="w-6 h-6" /> },
  { number: "30", label: "Hari Rata-rata Pengomposan", icon: <Clock className="w-6 h-6" /> },
  { number: "100%", label: "Dapat Didaur Ulang", icon: <CheckCircle className="w-6 h-6" /> },
];

export default function JenisSampahOrganik() {
  const [selected, setSelected] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'Mudah';
      case 'medium': return 'Sedang';
      case 'hard': return 'Sulit';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20" id="jenis-sampah">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Jenis Sampah Organik
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Sampah Organik yang Kami
            <span className="text-green-600"> Terima</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Berbagai jenis sampah organik yang dapat kami olah menjadi kompos berkualitas 
            untuk mendukung pertanian berkelanjutan dan lingkungan yang lebih sehat.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === index
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-green-50 shadow-md'
              }`}
            >
              {category.title}
            </button>
          ))}
        </motion.div>

        {/* Items Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {categories[activeCategory].items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(item)}
              className="bg-white rounded-2xl p-8 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${categories[activeCategory].color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  {item.icon}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(item.difficulty)}`}>
                  {getDifficultyText(item.difficulty)}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-green-600 font-semibold text-sm mb-3">{item.category}</p>
              <p className="text-gray-600 mb-6 line-clamp-3">{item.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Clock className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                  <div className="text-xs text-gray-500">Waktu Proses</div>
                  <div className="font-semibold text-gray-800 text-sm">{item.processingTime}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <TreePine className="w-5 h-5 text-gray-500 mx-auto mb-1" />
                  <div className="text-xs text-gray-500">Nilai Kompos</div>
                  <div className="font-semibold text-gray-800 text-sm">{item.compostValue}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-1">
                  {item.benefits.slice(0, 3).map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-green-100 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                  ))}
                </div>
                <ArrowRight className="w-5 h-5 text-green-600" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center text-white"
        >
          <h3 className="text-2xl font-bold mb-2">Punya Sampah Organik?</h3>
          <p className="mb-6 opacity-90">Mari bersama-sama mengolahnya menjadi kompos berkualitas</p>
          <motion.button
          onClick={() => window.location.href = "/login"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-green-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Login Sekarang
          </motion.button>
        </motion.div>

        {/* Enhanced Modal */}
        <Transition show={!!selected} as={Fragment}>
          <Dialog onClose={() => setSelected(null)} className="relative z-50">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                  {selected && (
                    <div className="p-8">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white">
                            {selected.icon}
                          </div>
                          <div>
                            <Dialog.Title className="text-2xl font-bold text-gray-800">
                              {selected.name}
                            </Dialog.Title>
                            <p className="text-green-600 font-semibold">{selected.category}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelected(null)}
                          className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                        >
                          <X className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>

                      {/* Description */}
                      <div className="mb-8">
                        <p className="text-gray-700 leading-relaxed text-lg">{selected.description}</p>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-blue-50 p-4 rounded-xl">
                          <Clock className="w-6 h-6 text-blue-600 mb-2" />
                          <div className="text-sm text-blue-600 font-semibold">Waktu Pengolahan</div>
                          <div className="text-lg font-bold text-blue-800">{selected.processingTime}</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl">
                          <TreePine className="w-6 h-6 text-green-600 mb-2" />
                          <div className="text-sm text-green-600 font-semibold">Nilai Kompos</div>
                          <div className="text-lg font-bold text-green-800">{selected.compostValue}</div>
                        </div>
                      </div>

                      {/* Tips */}
                      <div className="mb-8">
                        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                          <Info className="w-5 h-5 text-blue-600" />
                          Tips Pengolahan
                        </h4>
                        <ul className="space-y-2">
                          {selected.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits */}
                      <div className="mb-8">
                        <h4 className="text-lg font-bold text-gray-800 mb-4">Manfaat</h4>
                        <div className="flex flex-wrap gap-2">
                          {selected.benefits.map((benefit, index) => (
                            <span
                              key={index}
                              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-4">
                        <button
                          onClick={() => setSelected(null)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors"
                        >
                          Tutup
                        </button>
                        <button
                        onClick={() => window.location.href = "/request"}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                          Jadwalkan Pickup
                        </button>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}