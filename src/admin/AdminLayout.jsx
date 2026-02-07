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
          La Vie Noir Admin
        </h2>

        <nav className="space-y-4">
          <Link to="/admin" className="block hover:text-neon">
            Dashboard
          </Link>
          <Link to="/admin/vip" className="block hover:text-neon">
            VIP Reservations
          </Link>
        </nav>

        <button
          onClick={logout}
          className="mt-10 text-red-400 hover:text-red-300"
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
