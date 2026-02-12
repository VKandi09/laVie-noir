import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/vip/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status === 401) {
          localStorage.removeItem("adminToken");
          navigate("/admin/login", { replace: true });
          return;
        }

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Dashboard error:", err);
      }
    };

    loadStats();
  }, [navigate, token]);

  if (!stats) {
    return <p className="text-gray-400 mt-20">Loading dashboard…</p>;
  }

  const cards = [
    { label: "Total VIP Requests", value: stats.totalVIPs },
    { label: "Pending", value: stats.pendingVIPs, color: "text-yellow-400" },
    { label: "Confirmed", value: stats.confirmedVIPs, color: "text-green-400" },
    { label: "Declined", value: stats.declinedVIPs, color: "text-red-400" },
  ];

  return (
    <div className="mt-15">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {/* STAT CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        {cards.map((card) => (
          <div
            key={card.label}
            className="glass p-6 rounded-xl border border-white/10"
          >
            <p className="text-gray-400 text-sm mb-2">{card.label}</p>
            <p className={`text-3xl font-bold ${card.color || "text-white"}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* RECENT VIPS */}
      <div className="glass rounded-xl p-6 border border-white/10">
        <h2 className="text-2xl font-semibold mb-4">Recent VIP Requests</h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-white/10">
              <th className="py-2">Name</th>
              <th className="">Email</th>
              <th>Location</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.recent.map((vip) => (
              <tr
                key={vip._id}
                className="border-b border-white/5 last:border-none"
              >
                <td className="py-3">
                  {vip.firstName} {vip.lastName}
                </td>
                <td>{vip.email}</td>
                <td>{vip.location}</td>
                <td className="capitalize">
                  <span
                    className={
                      vip.status === "confirmed"
                        ? "text-green-400"
                        : vip.status === "declined"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }
                  >
                    {vip.status}
                  </span>
                </td>
                <td className="text-gray-400">
                  {new Date(vip.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
