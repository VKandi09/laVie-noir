import { useEffect, useState } from "react";
import { adminFetch } from "../utils/adminFetch.js";
import { Pencil, Trash2, X } from "lucide-react";

const VIP_LOCATIONS = ["La Vie Night Club", "Noir Bar & Lounge"];
const VIP_INTERESTS = ["VIP Table", "Private Event"];

const statusColor = (status) =>
  status === "confirmed"
    ? "text-green-400"
    : status === "declined"
    ? "text-red-400"
    : "text-yellow-400";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: VIP_LOCATIONS[0],
  interest: VIP_INTERESTS[0],
  message: "",
  status: "pending",
};

export default function VIPTable() {
  const [vips, setVips] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [editingVip, setEditingVip] = useState(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    adminFetch(`${import.meta.env.VITE_API_BASE_URL}/api/vip/all`)
      .then((res) => res.json())
      .then((data) => setVips(data || []))
      .catch();
  }, []);

  const updateStatus = async (id, status) => {
    setLoadingId(id);
    setVips((prev) => prev.map((v) => (v._id === id ? { ...v, status } : v)));
    try {
      const res = await adminFetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/vip/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const updated = await res.json();
      setVips((prev) => prev.map((v) => (v._id === id ? updated : v)));
    } catch {
      setVips((prev) =>
        prev.map((v) => (v._id === id ? { ...v, status: v.status } : v))
      );
    } finally {
      setLoadingId(null);
    }
  };

  const openEdit = (vip) => {
    setEditingVip(vip);
    setEditForm({
      firstName: vip.firstName,
      lastName: vip.lastName,
      email: vip.email,
      phone: vip.phone || "",
      location: vip.location,
      interest: vip.interest,
      message: vip.message || "",
      status: vip.status,
    });
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      const res = await adminFetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/vip/${editingVip._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        }
      );
      const updated = await res.json();
      setVips((prev) => prev.map((v) => (v._id === updated._id ? updated : v)));
      setEditingVip(null);
    } catch {
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const executeDelete = async () => {
    setDeleting(true);
    try {
      await adminFetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/vip/${deleteTarget._id}`,
        { method: "DELETE" }
      );
      setVips((prev) => prev.filter((v) => v._id !== deleteTarget._id));
      setDeleteTarget(null);
      setEditingVip(null);
    } catch {
      alert("Failed to delete entry.");
    } finally {
      setDeleting(false);
    }
  };

  const field = (label, children) => (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      {children}
    </div>
  );

  const inputClass =
    "w-full bg-zinc-800 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/50";

  return (
    <div className="mt-15">
      <h1 className="text-3xl font-bold mb-6">Manage VIP Reservations</h1>

      {vips.length === 0 ? (
        <p className="text-gray-400">No VIP requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-white/10">
            <thead>
              <tr className="text-left bg-zinc-800 text-sm uppercase tracking-wider">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Location</th>
                <th className="p-3">Interest</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vips.map((vip) => (
                <tr
                  key={vip._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-3 font-medium">
                    {vip.firstName} {vip.lastName}
                  </td>
                  <td className="p-3 text-gray-300">{vip.email}</td>
                  <td className="p-3">{vip.location}</td>
                  <td className="p-3">{vip.interest}</td>
                  <td className="p-3">
                    <select
                      disabled={loadingId === vip._id}
                      value={vip.status}
                      onChange={(e) => updateStatus(vip._id, e.target.value)}
                      className={`bg-black border border-white/20 rounded px-2 py-1 ${
                        loadingId === vip._id ? "opacity-50 cursor-not-allowed" : ""
                      } ${statusColor(vip.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="declined">Declined</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEdit(vip)}
                        title="Edit"
                        className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(vip)}
                        title="Delete"
                        className="p-1.5 rounded hover:bg-red-400/10 text-gray-400 hover:text-red-400 transition cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Edit Modal ── */}
      {editingVip && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold">Edit VIP Request</h2>
              <button
                onClick={() => setEditingVip(null)}
                className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Fields */}
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {field(
                  "First Name",
                  <input
                    value={editForm.firstName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, firstName: e.target.value })
                    }
                    className={inputClass}
                  />
                )}
                {field(
                  "Last Name",
                  <input
                    value={editForm.lastName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, lastName: e.target.value })
                    }
                    className={inputClass}
                  />
                )}
              </div>

              {field(
                "Email",
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className={inputClass}
                />
              )}

              {field(
                "Phone",
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  className={inputClass}
                />
              )}

              <div className="grid grid-cols-2 gap-4">
                {field(
                  "Location",
                  <select
                    value={editForm.location}
                    onChange={(e) =>
                      setEditForm({ ...editForm, location: e.target.value })
                    }
                    className={inputClass}
                  >
                    {VIP_LOCATIONS.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                )}
                {field(
                  "Interest",
                  <select
                    value={editForm.interest}
                    onChange={(e) =>
                      setEditForm({ ...editForm, interest: e.target.value })
                    }
                    className={inputClass}
                  >
                    {VIP_INTERESTS.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                )}
              </div>

              {field(
                "Message",
                <textarea
                  rows={3}
                  value={editForm.message}
                  onChange={(e) =>
                    setEditForm({ ...editForm, message: e.target.value })
                  }
                  className={`${inputClass} resize-none`}
                />
              )}

              {field(
                "Status",
                <select
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                  className={`${inputClass} ${statusColor(editForm.status)}`}
                >
                  <option value="pending" className="text-yellow-400">
                    Pending
                  </option>
                  <option value="confirmed" className="text-green-400">
                    Confirmed
                  </option>
                  <option value="declined" className="text-red-400">
                    Declined
                  </option>
                </select>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-white/10">
              <button
                onClick={() => setDeleteTarget(editingVip)}
                className="text-sm text-red-400 border border-red-400/30 px-4 py-2 rounded-lg hover:bg-red-400/10 transition cursor-pointer"
              >
                Delete Entry
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingVip(null)}
                  className="text-sm border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/5 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  disabled={saving}
                  className="text-sm bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition cursor-pointer"
                >
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Dialog ── */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-2">Delete VIP Entry?</h2>
            <p className="text-sm text-gray-400 mb-6">
              This will permanently remove the entry for{" "}
              <span className="text-white font-medium">
                {deleteTarget.firstName} {deleteTarget.lastName}
              </span>
              . This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteTarget(null)}
                className="text-sm border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                disabled={deleting}
                className="text-sm bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 transition cursor-pointer"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
