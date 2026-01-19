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
      className="min-h-screen px-6 md:px-12 py-24"
    >
      {/* Page Title */}
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-7xl font-extrabold text-neon mb-8 text-center"
      >
        La Vie Night Club
      </motion.h1>

      {/* Video Section */}
      <ComingSoonVideo
        src={lavieVideo}
        title="Coming Soon"
        subtitle="La Vie Night Club is arriving in Rochester!"
      />
    </motion.section>
  );
}
