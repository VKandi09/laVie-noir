import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 glass px-8 py-4 flex justify-between items-center bg-black/40 backdrop-blur-md"
    >
      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold text-white cursor-pointer tracking-wider"
      >
        LA VIE <span className="text-neon">NOIR</span>
      </h1>

      {/* NAV LINKS */}
      <ul className="flex gap-10 text-lg text-gray-300 items-center">
        {/* ABOUT */}
        {/* <li
          onClick={() => navigate("/about")}
          className="relative cursor-pointer nav-item"
        >
          About
        </li> */}

        {/* LOCATIONS DROPDOWN */}
        <li
          className="relative cursor-pointer nav-item"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <span className="flex items-center gap-1">
            Locations
          </span>

          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="absolute top-10 left-0 bg-black/90 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl w-50"
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

        {/* EVENTS */}
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

        {/* CONTACT */}
        <li
          onClick={() => navigate("/contact")}
          className="relative cursor-pointer nav-item"
        >
          Contact
        </li>
      </ul>
    </motion.nav>
  );
}
