import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-60 glass px-6 py-4 flex justify-between items-center bg-black/40 backdrop-blur-md"
    >
      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold text-white cursor-pointer tracking-wider"
      >
        LA VIE | <span className="text-neon">NOIR</span>
      </h1>

      {/* DESKTOP LINKS */}
      <ul className="hidden md:flex gap-8 text-lg text-gray-300 items-center">
        {/* Locations Dropdown */}
        <li
          className="relative cursor-pointer nav-item"
          onMouseEnter={() => setLocationsOpen(true)}
          onMouseLeave={() => setLocationsOpen(false)}
        >
          <span className="flex items-center gap-1">Locations</span>

          <AnimatePresence>
            {locationsOpen && (
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="absolute top-10 left-0 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl w-40"
              >
                <li
                  onClick={() => navigate("/la-vie")}
                  className="px-4 py-3 hover:bg-purple-500/20 text-white transition"
                >
                  La Vie
                </li>
                <li
                  onClick={() => navigate("/noir")}
                  className="px-4 py-3 hover:bg-teal-500/20 text-white transition"
                >
                  Noir
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </li>

        <li
          onClick={() => {
            navigate("/");
            setTimeout(() => {
              document
                .querySelector(".events")
                ?.scrollIntoView({ behavior: "smooth" });
            }, 200);
          }}
          className="relative cursor-pointer nav-item"
        >
          Events
        </li>

        <li
          onClick={() => navigate("/gallery")}
          className="relative cursor-pointer nav-item"
        >
          Gallery
        </li>

        <li
          onClick={() => navigate("/vip")}
          className="relative cursor-pointer nav-item"
        >
          VIP
        </li>

        <li
          onClick={() => navigate("/contact")}
          className="relative cursor-pointer nav-item"
        >
          Contact
        </li>
      </ul>

      {/* MOBILE MENU BUTTON */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 h-120 bg-black text-white flex flex-col items-center justify-center gap-6 md:hidden z-100"
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white text-2xl font-bold"
            >
              ✕
            </button>

            {/* Locations Dropdown */}
            <div className="relative w-full flex flex-col items-center">
              <button
                onClick={() => setLocationsOpen(!locationsOpen)}
                className="text-lg font-semibold px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 transition"
              >
                Locations
              </button>

              <AnimatePresence>
                {locationsOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 bg-black/95 border border-white/10 rounded-xl overflow-hidden w-40 flex flex-col items-center"
                  >
                    <li
                      onClick={() => {
                        navigate("/la-vie");
                        setMenuOpen(false);
                        setLocationsOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-purple-500/20 text-white w-full text-center cursor-pointer transition"
                    >
                      La Vie
                    </li>
                    <li
                      onClick={() => {
                        navigate("/noir");
                        setMenuOpen(false);
                        setLocationsOpen(false);
                      }}
                      className="px-4 py-3 hover:bg-teal-500/20 text-white w-full text-center cursor-pointer transition"
                    >
                      Noir
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Other Menu Items */}
            {["Events", "Gallery", "VIP", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "Events") {
                    navigate("/");
                    setTimeout(() => {
                      document
                        .querySelector(".events")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 200);
                  } else {
                    navigate(`/${item.toLowerCase()}`);
                  }
                  setMenuOpen(false);
                }}
                className="text-lg font-medium px-6 py-3 rounded-full hover:bg-white/10 transition"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
