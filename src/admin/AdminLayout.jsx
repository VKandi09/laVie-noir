import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { adminFetch } from "../utils/adminFetch.js";

function Badge({ count }) {
  if (!count) return null;
  return (
    <span className="ml-auto bg-yellow-500/20 text-yellow-400 text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
      {count}
    </span>
  );
}

function NavLinks({ onClick, onLogout, pendingVIPs, pendingReservations }) {
  return (
    <>
      <Link
        to="/admin"
        onClick={onClick}
        className="block hover:bg-gray-500/20 px-3 py-2 rounded hover:text-neon"
      >
        Dashboard
      </Link>
      <Link
        to="/admin/vip"
        onClick={onClick}
        className="flex items-center hover:bg-gray-500/20 px-3 py-2 rounded hover:text-neon"
      >
        Manage VIP Reservations
        <Badge count={pendingVIPs} />
      </Link>
      <Link
        to="/admin/reservations"
        onClick={onClick}
        className="flex items-center hover:bg-gray-500/20 px-3 py-2 rounded hover:text-neon"
      >
        Manage General Reservations
        <Badge count={pendingReservations} />
      </Link>
      <Link
        to="/admin/settings"
        onClick={onClick}
        className="block hover:bg-gray-500/20 px-3 py-2 rounded hover:text-neon"
      >
        Settings
      </Link>
      <button
        onClick={() => { onLogout(); onClick?.(); }}
        className="mt-6 block text-red-400 hover:bg-red-500/20 px-3 py-2 rounded hover:text-neon cursor-pointer w-full text-left"
      >
        Logout
      </button>
    </>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingVIPs, setPendingVIPs] = useState(0);
  const [pendingReservations, setPendingReservations] = useState(0);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const [vipRes, resRes] = await Promise.all([
          adminFetch(`${import.meta.env.VITE_API_BASE_URL}/api/vip/stats`),
          adminFetch(`${import.meta.env.VITE_API_BASE_URL}/api/reservations/stats`),
        ]);
        const [vipData, resData] = await Promise.all([vipRes.json(), resRes.json()]);
        setPendingVIPs(vipData.pendingVIPs || 0);
        setPendingReservations(resData.pendingReservations || 0);
      } catch {
        // silently fail — badges are non-critical
      }
    };
    fetchPending();
  }, []);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const navProps = { onLogout: logout, pendingVIPs, pendingReservations };

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-zinc-900 p-6 shrink-0">
        <h2 className="text-xl font-bold text-neon mb-8 mt-15">Admin</h2>
        <nav className="space-y-4">
          <NavLinks {...navProps} />
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 p-6 z-50 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 text-white cursor-pointer"
        >
          <X size={22} />
        </button>
        <h2 className="text-xl font-bold text-neon mb-8 mt-10">Admin</h2>
        <nav className="space-y-4">
          <NavLinks {...navProps} onClick={() => setSidebarOpen(false)} />
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 mb-4 mt-16">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white cursor-pointer"
          >
            <Menu size={24} />
          </button>
          <span className="text-neon font-bold tracking-wider">Admin</span>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
