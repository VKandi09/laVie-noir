import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Events from "./components/Events";

// import Locations from "./components/Locations";
// import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

import LaVie from "./pages/LaVie";
import Noir from "./pages/Noir";
import Contact from "./pages/Contact";

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

          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}


