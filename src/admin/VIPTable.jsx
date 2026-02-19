import { useEffect, useState } from "react";
import { adminFetch } from "../utils/adminFetch.js";

export default function VIPTable() {
  const [vips, setVips] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    adminFetch(`${import.meta.env.VITE_API_BASE_URL}/api/vip`)
    .then((res) => res.json())
    .then((data) => {
      setVips(data.recent || []);
    })
    .catch();
  }, []);

//   const confirmedVIPs = useMemo(
//     () => vips.filter((v) => v.status === 'confirmed'), 
//     [vips]
//   );

  const updateStatus = async (id, status) => {
    setLoadingId(id);
    setVips((prev) => 
        prev.map((v) => v._id === id ? { ...v, status} : v)
    );
    try {
        const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/vip/${id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      }
    );

    const updatedVIP = await res.json();
    setVips((prev) =>
      prev.map((v) => (v._id === id ? updatedVIP : v))
    );
    } catch (error) {
        alert("Failed to update status:", error);
        setVips((prev) =>
            prev.map((v) =>
                v._id === id
                ? { ...v, status: v.status } // revert
                : v
            )
        );
    } finally {
        setLoadingId(null);
    }
  };

  return (
    <div className="mt-15">
      <h1 className="text-3xl font-bold mb-6">Manage VIP Reservations</h1>

      <table className="w-full border border-white/10">
        <thead>
          <tr className="text-left bg-zinc-800">
            <th className="p-3">Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Interest</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vips.map((vip) => (
            <tr key={vip._id} className="border-t border-white/10">
              <td className="p-3">
                {vip.firstName} {vip.lastName}
              </td>
              <td>{vip.email}</td>
              <td>{vip.location}</td>
              <td>{vip.interest}</td>
              <td>
                <select
                    disabled={loadingId === vip._id}
                    value={vip.status}
                    onChange={(e) =>
                        updateStatus(vip._id, e.target.value)
                    }
                    className={`bg-black border border-white/20 rounded px-2 py-1 
                      ${loadingId === vip._id ? "opacity-50 cursor-not-allowed" : ""}
                      ${
                        vip.status === "confirmed"
                          ? "text-green-400"
                          : vip.status === "declined"
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
  );
}
