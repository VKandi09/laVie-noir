import { motion } from "framer-motion";

export default function Locations() {
  return (
    <section className="h-screen flex flex-col md:flex-row overflow-hidden">

      {/* LA VIE NIGHT CLUB */}
      <motion.div
        initial={{ 
            x: -200, 
            opacity: 0 
        }}
        whileInView={{ 
            x: 0, 
            opacity: 1 
        }}
        transition={{ 
            duration: 0.05 
        }}
        whileHover={{ 
            flex: 2.5 
        }}
        className="flex-1 relative group cursor-pointer transition-all duration-500"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-900 via-purple to-black" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <motion.h2
            initial={{ 
                y: 40, 
                opacity: 0 
            }}
            whileInView={{ 
                y: 0, 
                opacity: 1 
            }}
            transition={{ 
                delay: 0.4 
            }}
            className="text-5xl md:text-6xl font-extrabold text-white"
          >
            LA VIE
          </motion.h2>

          <p className="mt-4 text-gray-300 max-w-md">
            High-energy nightlife, world-class DJs, immersive lighting & premium sound.
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-8 px-8 py-4 border border-neon rounded-full text-white"
          >
            Explore Night Club
          </motion.button>
        </div>
      </motion.div>

      {/* NOIR BAR & LOUNGE */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.05 }}
        whileHover={{ flex: 2.5 }}
        className="flex-1 relative group cursor-pointer transition-all duration-500"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-br from-teal-900 via-teal to-black" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/25 transition" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-6xl font-extrabold text-white"
          >
            NOIR
          </motion.h2>

          <p className="mt-4 text-gray-400 max-w-md">
            Sophisticated cocktails, ambient music, intimate lounge experience.
          </p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-8 px-8 py-4 border border-white rounded-full text-white"
          >
            Explore Bar & Lounge
          </motion.button>
        </div>
      </motion.div>

    </section>
  );
}
