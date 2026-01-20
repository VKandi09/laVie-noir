import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Footer from "./components/Footer";

import LaVie from "./pages/LaVie";
import Noir from "./pages/Noir";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import VIP from "./pages/VIP";

export default function App() {
  const location = useLocation();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                {/* <Locations /> */}
                <Events />
                {/* <Gallery /> */}
              </>
            }
          />

          {/* LA VIE */}
          <Route path="/la-vie" element={<LaVie />} />

          {/* NOIR */}
          <Route path="/noir" element={<Noir />} />

          {/* Gallery Page */}
          <Route path="/gallery" element={<Gallery />} />

          {/* VIP Page */}
          <Route path="/vip" element={<VIP />} />

          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}


