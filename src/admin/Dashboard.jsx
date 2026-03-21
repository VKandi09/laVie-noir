import { useEffect, useState } from "react";
import { adminFetch } from "../utils/adminFetch.js";

const statusColor = (s) =>
  s === "confirmed" ? "text-green-400" : s === "declined" ? "text-red-400" : "text-yellow-400";

const formatDateTime = (dt) =>
  new Date(dt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

export default function Dashboard() {
  const [vipStats, setVipStats] = useState(null);
  const [resStats, setResStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [vipRes, resRes] = await Promise.all([
          adminFetch(`${import.meta.env.VITE_API_BASE_URL}/api/vip/stats`),
          adminFetch(`${import.meta.env.VITE_API_BASE_URL}/api/reservations/stats`),
        ]);
        const [vipData, resData] = await Promise.all([vipRes.json(), resRes.json()]);
        setVipStats(vipData);
        setResStats(resData);
      } catch (err) {
        console.error("Dashboard error:", err);
      }
    };
    load();
  }, []);

  if (!vipStats || !resStats) {
    return <p className="text-gray-400 mt-20">Loading dashboard…</p>;
  }

  const vipCards = [
    { label: "Total VIP Requests", value: vipStats.totalVIPs },
    { label: "Pending", value: vipStats.pendingVIPs, color: "text-yellow-400" },
    { label: "Confirmed", value: vipStats.confirmedVIPs, color: "text-green-400" },
    { label: "Declined", value: vipStats.declinedVIPs, color: "text-red-400" },
  ];

  const resCards = [
    { label: "Total Reservations", value: resStats.totalReservations },
    { label: "Pending", value: resStats.pendingReservations, color: "text-yellow-400" },
    { label: "Confirmed", value: resStats.confirmedReservations, color: "text-green-400" },
    { label: "Declined", value: resStats.declinedReservations, color: "text-red-400" },
  ];

  return (
    <div className="mt-15">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      {/* VIP STATS */}
      <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">VIP Requests</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        {vipCards.map((card) => (
          <div key={card.label} className="glass p-6 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm mb-2">{card.label}</p>
            <p className={`text-3xl font-bold ${card.color || "text-white"}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* RESERVATION STATS */}
      <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">General Reservations</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
        {resCards.map((card) => (
          <div key={card.label} className="glass p-6 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm mb-2">{card.label}</p>
            <p className={`text-3xl font-bold ${card.color || "text-white"}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* RECENT VIPS */}
      <div className="glass rounded-xl p-6 border border-white/10 mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent VIP Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-125">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="py-2 pr-4">Name</th>
                <th className="pr-4">Email</th>
                <th className="pr-4">Location</th>
                <th className="pr-4">Status</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {vipStats.recent.map((vip) => (
                <tr key={vip._id} className="border-b border-white/5 last:border-none">
                  <td className="py-3 pr-4">{vip.firstName} {vip.lastName}</td>
                  <td className="pr-4">{vip.email}</td>
                  <td className="pr-4">{vip.location}</td>
                  <td className="pr-4 capitalize">
                    <span className={statusColor(vip.status)}>{vip.status}</span>
                  </td>
                  <td className="text-gray-400">{new Date(vip.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECENT RESERVATIONS */}
      <div className="glass rounded-xl p-6 border border-white/10">
        <h2 className="text-xl font-semibold mb-4">Recent General Reservations</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-125">
            <thead>
              <tr className="text-left text-gray-400 border-b border-white/10">
                <th className="py-2 pr-4">Name</th>
                <th className="pr-4">Location</th>
                <th className="pr-4">Date & Time</th>
                <th className="pr-4">Status</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {resStats.recent.map((r) => (
                <tr key={r._id} className="border-b border-white/5 last:border-none">
                  <td className="py-3 pr-4">{r.firstName} {r.lastName}</td>
                  <td className="pr-4">{r.location}</td>
                  <td className="pr-4">{formatDateTime(r.reservationDateTime)}</td>
                  <td className="pr-4 capitalize">
                    <span className={statusColor(r.status)}>{r.status}</span>
                  </td>
                  <td className="text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
