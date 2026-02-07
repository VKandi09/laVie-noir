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
import VIPReservation from "./pages/VIPReservation";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/ProtectedRoute";
import Dashboard from "./admin/Dashboard";
import VIPTable from "./admin/VIPTable";

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

          {/* VIP Reservations Page */}
          <Route path="/vip-reservation" element={<VIPReservation />} />

          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="vip" element={<VIPTable />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}


