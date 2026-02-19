import { useEffect, useState } from "react";
import { adminFetch } from "../utils/adminFetch.js";

export default function ReservationsTable() {
  const [reservations, setReservations] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    adminFetch(`${import.meta.env.VITE_API_BASE_URL}/api/reservations`)
      .then((res) => res.json())
      .then((data) => {
        setReservations(data || []);
      })
      .catch();
  }, []);

  const updateStatus = async (id, status) => {
    setLoadingId(id);

    setReservations((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status } : r))
    );

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/reservations/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const updated = await res.json();

      setReservations((prev) =>
        prev.map((r) => (r._id === id ? updated : r))
      );
    } catch (error) {
      alert("Failed to update status", error);
    } finally {
      setLoadingId(null);
    }
  };

    const formatDate = (date) =>
    new Date(date).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    });

  return (
    <div className="mt-16">
      <h1 className="text-3xl font-bold mb-8">
        Manage General Reservations
      </h1>

      {reservations.length === 0 ? (
        <p className="text-gray-400">No reservations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-white/10 rounded-xl overflow-hidden">
            <thead>
              <tr className="text-left bg-zinc-900 text-sm uppercase tracking-wider">
                <th className="p-4">Guest</th>
                <th>Email</th>
                <th>Date & Time</th>
                <th>Party</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((r) => (
                <tr
                  key={r._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-4 font-medium">
                    {r.firstName} {r.lastName}
                  </td>

                  <td className="text-gray-300">{r.email}</td>

                  <td>{formatDate(r.reservationDateTime)}</td>

                  <td>{r.partySize}</td>

                  <td>
                    <select
                      disabled={loadingId === r._id}
                      value={r.status}
                      onChange={(e) =>
                        updateStatus(r._id, e.target.value)
                      }
                      className={`bg-black border border-white/20 rounded-lg px-3 py-1 text-sm ${
                        r.status === "confirmed"
                          ? "text-green-400"
                          : r.status === "declined"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="declined">Declined</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
