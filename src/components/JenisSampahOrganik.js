'use client';

import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Apple, Soup, Trash2, Droplet, Pizza } from 'lucide-react';

const items = [
  {
    icon: <Apple className="w-8 h-8 text-green-700" />,
    name: 'Sisa Makanan',
    description: 'Sisa makanan seperti nasi, sayur, buah yang membusuk termasuk sampah organik dan dapat dijadikan kompos.'
  },
  {
    icon: <Soup className="w-8 h-8 text-green-700" />,
    name: 'Ampas Kopi & Teh',
    description: 'Ampas kopi dan teh dapat digunakan untuk pupuk atau campuran kompos alami.'
  },
  {
    icon: <Leaf className="w-8 h-8 text-green-700" />,
    name: 'Daun & Rumput',
    description: 'Daun dan rumput kering dapat diolah menjadi kompos atau bahan bakar alami.'
  },
  {
    icon: <Trash2 className="w-8 h-8 text-green-700" />,
    name: 'Kulit Buah',
    description: 'Kulit buah seperti pisang, jeruk, dan mangga mudah terurai dan cocok untuk kompos.'
  },
  {
    icon: <Droplet className="w-8 h-8 text-green-700" />,
    name: 'Minyak Jelantah',
    description: 'Minyak goreng bekas bisa dikumpulkan untuk diolah kembali menjadi biodiesel.'
  },
  {
    icon: <Pizza className="w-8 h-8 text-green-700" />,
    name: 'Tulang & Daging Busuk',
    description: 'Meskipun perlu perlakuan khusus, tulang dan daging busuk juga termasuk sampah organik.'
  },
];

export default function JenisSampahOrganik() {
  const [selected, setSelected] = useState(null);

  return (
    
    <div className="bg-[#F4FBE3] py-16 px-4" id="jenis-sampah">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-10">Jenis Sampah Organik yang Diterima</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelected(item)}
              className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold text-black mb-2">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.description.substring(0, 60)}...</p>
            </motion.div>
          ))}
        </div>

        <Dialog open={!!selected} onClose={() => setSelected(null)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white max-w-md w-full rounded-lg p-6 shadow-xl">
              <Dialog.Title className="text-xl font-bold text-green-800 mb-2">{selected?.name}</Dialog.Title>
              <p className="text-gray-700">{selected?.description}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Tutup
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
}