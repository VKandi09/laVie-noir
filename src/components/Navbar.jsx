import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [reservationsOpen, setReservationsOpen] = useState(false);

  const goToEvents = () => {
    const scroll = () =>
      document.querySelector(".events")?.scrollIntoView({ behavior: "smooth" });
    if (location.pathname === "/") {
      scroll();
    } else {
      navigate("/");
      setTimeout(scroll, 600);
    }
  };

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
                className="absolute top-10 left-0 bg-black backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl w-40"
              >
                <li
                  onClick={() => navigate("/la-vie")}
                  className="px-4 py-3 hover:bg-purple-500/20 text-white transition cursor-pointer"
                >
                  La Vie
                </li>
                <li
                  onClick={() => navigate("/noir")}
                  className="px-4 py-3 hover:bg-teal-500/20 text-white transition cursor-pointer"
                >
                  Noir
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </li>

        {/* Events */}
        <li
          onClick={goToEvents}
          className="relative cursor-pointer nav-item"
        >
          Events
        </li>

        {/* Reservations Dropdown */}
        <li
          className="relative cursor-pointer nav-item"
          onMouseEnter={() => setReservationsOpen(true)}
          onMouseLeave={() => setReservationsOpen(false)}
        >
          <span className="flex items-center gap-1">Reservations</span>

          <AnimatePresence>
            {reservationsOpen && (
              <motion.ul
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="absolute top-10 left-0 bg-black backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl w-55"
              >
                <li
                  onClick={() => navigate("/reservations")}
                  className="px-4 py-3 hover:bg-purple-500/20 text-white transition cursor-pointer"
                >
                  Table Reservation
                </li>
                <li
                  onClick={() => navigate("/vip")}
                  className="px-4 py-3 hover:bg-teal-500/20 text-white transition cursor-pointer"
                >
                  VIP
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </li>

        <li
          onClick={() => navigate("/gallery")}
          className="relative cursor-pointer nav-item"
        >
          Gallery
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
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 bg-zinc-950 border-b border-white/10 text-white flex flex-col md:hidden z-100 pt-20 pb-6 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white transition cursor-pointer"
            >
              <X size={22} />
            </button>

            {/* Locations Dropdown */}
            <div className="flex flex-col">
              <button
                onClick={() => setLocationsOpen(!locationsOpen)}
                className="flex items-center justify-between w-full px-6 py-4 text-base font-semibold text-gray-200 hover:bg-white/5 transition cursor-pointer"
              >
                Locations
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-300 ${locationsOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {locationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-zinc-900"
                  >
                    <button
                      onClick={() => { navigate("/la-vie"); setMenuOpen(false); setLocationsOpen(false); }}
                      className="flex items-center gap-3 w-full px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-purple-500/10 transition cursor-pointer border-l-2 border-purple-500/50"
                    >
                      La Vie Night Club
                    </button>
                    <button
                      onClick={() => { navigate("/noir"); setMenuOpen(false); setLocationsOpen(false); }}
                      className="flex items-center gap-3 w-full px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-teal-500/10 transition cursor-pointer border-l-2 border-teal-500/50"
                    >
                      Noir Bar & Lounge
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-px bg-white/5 mx-6" />

            {/* Reservations Dropdown */}
            <div className="flex flex-col">
              <button
                onClick={() => setReservationsOpen(!reservationsOpen)}
                className="flex items-center justify-between w-full px-6 py-4 text-base font-semibold text-gray-200 hover:bg-white/5 transition cursor-pointer"
              >
                Reservations
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform duration-300 ${reservationsOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {reservationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-zinc-900"
                  >
                    <button
                      onClick={() => { navigate("/reservations"); setMenuOpen(false); setReservationsOpen(false); }}
                      className="flex items-center gap-3 w-full px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-purple-500/10 transition cursor-pointer border-l-2 border-purple-500/50"
                    >
                      Table Reservation
                    </button>
                    <button
                      onClick={() => { navigate("/vip"); setMenuOpen(false); setReservationsOpen(false); }}
                      className="flex items-center gap-3 w-full px-8 py-3 text-sm text-gray-300 hover:text-white hover:bg-teal-500/10 transition cursor-pointer border-l-2 border-teal-500/50"
                    >
                      VIP Access
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-px bg-white/5 mx-6" />

            {/* Flat Items */}
            {[
              { label: "Events", action: () => goToEvents() },
              { label: "Gallery", action: () => navigate("/gallery") },
              { label: "Contact", action: () => navigate("/contact") },
            ].map(({ label, action }) => (
              <button
                key={label}
                onClick={() => { action(); setMenuOpen(false); }}
                className="w-full px-6 py-4 text-base font-semibold text-gray-200 hover:bg-white/5 hover:text-white text-left transition cursor-pointer"
              >
                {label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
