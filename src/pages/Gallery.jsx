import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const images = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/4.jpg",
  "/images/gallery/5.jpg",
  "/images/gallery/6.jpg",
  "/images/gallery/7.jpg",
  "/images/gallery/8.jpg",
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="min-h-screen bg-black px-6 md:px-12 py-24">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-5xl md:text-6xl font-extrabold text-white mb-6"
      >
        Gallery
      </motion.h1>

      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
        A glimpse into the nights, the lights, and the unforgettable moments at
        La Vie & Noir.
      </p>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
        {images.map((src, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            className="relative cursor-pointer overflow-hidden rounded-2xl group"
            onClick={() => setSelected(src)}
          >
            <img
              src={src}
              alt="Nightlife gallery"
              className="w-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center">
              <span className="text-white text-sm tracking-widest uppercase">
                View
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
            onClick={() => setSelected(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selected}
              className="max-h-[85vh] rounded-xl shadow-2xl"
              alt="Expanded view"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
