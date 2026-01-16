import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-900/40 to-black" />

      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-8xl font-extrabold text-neon relative"
      >
        Welcome to La Vie Noir!!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-lg text-gray-300"
      >
        Where Beats Meet Luxury
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 px-10 py-4 bg-neon text-black rounded-full font-semibold"
      >
        Book VIP Table
      </motion.button>
    </section>
  );
}
