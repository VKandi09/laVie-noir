import { motion } from "framer-motion";

export default function ComingSoonVideo({
  src,
  title = "Coming Soon",
  subtitle = "Opening Soon",
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden rounded-2xl glass"
    >
      {/* Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-6xl font-extrabold text-neon"
        >
          {title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-lg md:text-xl text-gray-200"
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.section>
  );
}
