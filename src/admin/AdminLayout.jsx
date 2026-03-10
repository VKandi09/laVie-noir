import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const NavLinks = ({ onClick }) => (
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
        className="block hover:bg-gray-500/20 px-3 py-2 rounded hover:text-neon"
      >
        Manage VIP Reservations
      </Link>
      <Link
        to="/admin/reservations"
        onClick={onClick}
        className="block hover:bg-gray-500/20 px-3 py-2 rounded hover:text-neon"
      >
        Manage General Reservations
      </Link>
      <button
        onClick={() => { logout(); onClick?.(); }}
        className="mt-6 block text-red-400 hover:bg-red-500/20 px-3 py-2 rounded hover:text-neon cursor-pointer w-full text-left"
      >
        Logout
      </button>
    </>
  );

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-zinc-900 p-6 shrink-0">
        <h2 className="text-xl font-bold text-neon mb-8 mt-15">Admin</h2>
        <nav className="space-y-4">
          <NavLinks />
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
          <NavLinks onClick={() => setSidebarOpen(false)} />
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
