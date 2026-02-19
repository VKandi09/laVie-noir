import { Outlet, Link, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 p-6">
        <h2 className="text-xl font-bold text-neon mb-8 mt-15">
          Admin
        </h2>

        <nav className="space-y-4">
          <Link to="/admin" className="block hover:bg-gray-500/20 px-3 py-2 rounded hover:text-neon">
            Dashboard
          </Link>
          <Link to="/admin/vip" className="block hover:bg-gray-500/20 px-3 py-2 rounded hover:text-neon">
            Manage VIP Reservations
          </Link>
          <Link to="/admin/reservations" className="block hover:bg-gray-500/20 px-3 py-2 rounded hover:text-neon">
            Manage General Reservations
          </Link>
        </nav>

        <button
          onClick={logout}
          className="mt-10 block text-red-400 hover:bg-red-500/20 px-3 py-2 rounded hover:text-neon cursor-pointer"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
