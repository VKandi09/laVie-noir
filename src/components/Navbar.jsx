import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 glass px-8 py-4 flex backdrop-blur-sm justify-between items-center bg-black/40"
    >
      <h1 className="text-xl font-bold text-white">LA VIE - NOIR</h1>
      <ul className="flex gap-6 text-lg text-gray-300">
        <li>Home</li>
        <li>Events</li>
        <li>Gallery</li>
        <li>VIP</li>
      </ul>
    </motion.nav>
  );
}
