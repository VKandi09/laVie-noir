import { motion } from "framer-motion";
import ComingSoonVideo from "../components/ComingSoonVideo";
import lavieVideo from "/images/Interior-plan.mp4";

export default function LaVie() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen px-6 md:px-12 py-24 text-gray-200"
    >
      {/* Page Title */}
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-7xl font-extrabold text-neon mb-6 text-center"
      >
        La Vie Night Club
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-center text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-14"
      >
        Where luxury meets nightlife. An immersive experience of music, lights,
        and energy—crafted for unforgettable nights.
      </motion.p>

      {/* Video Section */}
      <ComingSoonVideo
        src={lavieVideo}
        title="Coming Soon"
        subtitle="La Vie Night Club is arriving in Rochester!"
      />

      {/* Info Sections */}
      <div className="mt-24 grid gap-16 md:grid-cols-2 max-w-6xl mx-auto">
        
        {/* About */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            The La Vie Experience
          </h2>
          <p className="text-gray-300 leading-relaxed">
            La Vie Night Club is designed to redefine Rochester’s nightlife.
            Featuring world-class DJs, state-of-the-art sound systems, immersive
            lighting, and a luxury interior inspired by global nightlife capitals.
            Every night at La Vie is curated for energy, elegance, and excitement.
          </p>
        </motion.div>

        {/* Music & Vibe */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Music & Vibes
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li>• Top 40 • EDM • Hip-Hop • International Beats</li>
            <li>• Live DJ performances & themed party nights</li>
            <li>• VIP tables & bottle service experience</li>
            <li>• High-energy dance floor with immersive visuals</li>
          </ul>
        </motion.div>
      </div>

      {/* Details Bar */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-20 max-w-6xl mx-auto glass rounded-2xl p-8 grid gap-8 md:grid-cols-3 text-center"
      >
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Opening Soon</h3>
          <p className="text-gray-300">Rochester, NY</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Dress Code</h3>
          <p className="text-gray-300">Upscale • Smart • Stylish</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Age Policy</h3>
          <p className="text-gray-300">21+ Only</p>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        className="mt-16 text-center text-lg text-gray-300"
      >
        Follow us for opening announcements, exclusive previews, and VIP access.
        <span className="block mt-2 text-neon font-semibold">
          The night begins at La Vie.
        </span>
      </motion.p>
    </motion.section>
  );
}
