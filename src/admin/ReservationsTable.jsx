import { useEffect, useState } from "react";
import { adminFetch } from "../utils/adminFetch.js";
import { Pencil, Trash2, X, Download } from "lucide-react";

const TIME_SLOTS = [
  "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM",
  "12:00 AM", "1:00 AM", "2:00 AM",
];

const LOCATIONS = ["La Vie Night Club", "Noir Bar & Lounge"];
const PAGE_SIZE = 10;

const statusColor = (status) =>
  status === "confirmed"
    ? "text-green-400"
    : status === "declined"
    ? "text-red-400"
    : "text-yellow-400";

const formatDate = (dt) =>
  new Date(dt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const toDateInput = (dt) => {
  const d = new Date(dt);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const toTimeSlot = (dt) => {
  const d = new Date(dt);
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${m} ${period}`;
};

const exportCSV = (data) => {
  const headers = [
    "First Name", "Last Name", "Email", "Phone", "Location",
    "Date & Time", "Party Size", "Occasion", "Notes", "Status", "Submitted",
  ];
  const rows = data.map((r) => [
    r.firstName,
    r.lastName,
    r.email,
    r.phone,
    r.location || "",
    formatDate(r.reservationDateTime),
    r.partySize,
    (r.occasion || "").replace(/,/g, ";"),
    (r.notes || "").replace(/,/g, ";"),
    r.status,
    new Date(r.createdAt).toLocaleDateString(),
  ]);
  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "reservations.csv";
  a.click();
  URL.revokeObjectURL(url);
};

export default function ReservationsTable() {
  const [reservations, setReservations] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [editingRes, setEditingRes] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Filters & pagination
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    adminFetch(`${import.meta.env.VITE_API_BASE_URL}/api/reservations`)
      .then((res) => res.json())
      .then((data) => setReservations(data || []))
      .catch();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => { setCurrentPage(1); }, [search, filterStatus, filterLocation]);

  const filtered = reservations.filter((r) => {
    const matchSearch =
      !search ||
      `${r.firstName} ${r.lastName} ${r.email}`.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    const matchLocation = filterLocation === "all" || r.location === filterLocation;
    return matchSearch && matchStatus && matchLocation;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const updateStatus = async (id, status) => {
    setLoadingId(id);
    setReservations((prev) =>
      prev.map((r) => (r._id === id ? { ...r, status } : r))
    );
    try {
      const res = await adminFetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/reservations/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      const updated = await res.json();
      setReservations((prev) =>
        prev.map((r) => (r._id === id ? updated : r))
      );
    } catch {
      /* revert on error */
    } finally {
      setLoadingId(null);
    }
  };

  const openEdit = (r) => {
    setEditingRes(r);
    setEditForm({
      firstName: r.firstName,
      lastName: r.lastName,
      email: r.email,
      phone: r.phone,
      location: r.location || "",
      reservationDate: toDateInput(r.reservationDateTime),
      reservationTime: toTimeSlot(r.reservationDateTime),
      partySize: r.partySize,
      occasion: r.occasion || "",
      notes: r.notes || "",
      status: r.status,
    });
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      const res = await adminFetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/reservations/${editingRes._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...editForm,
            partySize: Number(editForm.partySize),
          }),
        }
      );
      const updated = await res.json();
      setReservations((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r))
      );
      setEditingRes(null);
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
        `${import.meta.env.VITE_API_BASE_URL}/api/reservations/${deleteTarget._id}`,
        { method: "DELETE" }
      );
      setReservations((prev) =>
        prev.filter((r) => r._id !== deleteTarget._id)
      );
      setDeleteTarget(null);
      setEditingRes(null);
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

  const selectClass =
    "bg-zinc-900 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none";

  return (
    <div className="mt-16">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Manage General Reservations</h1>
        <button
          onClick={() => exportCSV(filtered)}
          className="flex items-center gap-2 text-sm border border-white/20 px-4 py-2 rounded-lg hover:bg-white/5 transition cursor-pointer"
        >
          <Download size={15} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <input
          type="text"
          placeholder="Search name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-zinc-900 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/40 w-56"
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={selectClass}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="declined">Declined</option>
        </select>
        <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} className={selectClass}>
          <option value="all">All Locations</option>
          {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
        </select>
        {(search || filterStatus !== "all" || filterLocation !== "all") && (
          <button
            onClick={() => { setSearch(""); setFilterStatus("all"); setFilterLocation("all"); }}
            className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400">No reservations found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-white/10 rounded-xl overflow-hidden">
              <thead>
                <tr className="text-left bg-zinc-900 text-sm uppercase tracking-wider">
                  <th className="p-4">Guest</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Party</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Submitted</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((r) => (
                  <tr
                    key={r._id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="p-4 font-medium">
                      {r.firstName} {r.lastName}
                    </td>
                    <td className="p-4 text-gray-300">{r.email}</td>
                    <td className="p-4 text-gray-300">{r.location || "—"}</td>
                    <td className="p-4">{formatDate(r.reservationDateTime)}</td>
                    <td className="p-4">{r.partySize}</td>
                    <td className="p-4">
                      <select
                        disabled={loadingId === r._id}
                        value={r.status}
                        onChange={(e) => updateStatus(r._id, e.target.value)}
                        className={`bg-black border border-white/20 rounded-lg px-3 py-1 text-sm ${
                          loadingId === r._id ? "opacity-50 cursor-not-allowed" : ""
                        } ${statusColor(r.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="declined">Declined</option>
                      </select>
                    </td>
                    <td className="p-4 text-gray-400 text-sm">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-1">
                        <button
                          onClick={() => openEdit(r)}
                          title="Edit"
                          className="p-1.5 rounded hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(r)}
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

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
            <span>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-white/20 disabled:opacity-30 hover:bg-white/10 transition cursor-pointer"
              >
                ←
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-white/20 disabled:opacity-30 hover:bg-white/10 transition cursor-pointer"
              >
                →
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Edit Modal ── */}
      {editingRes && (
        <div className="fixed top-15 inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-white/10 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <h2 className="text-lg font-semibold">Edit Reservation</h2>
              <button
                onClick={() => setEditingRes(null)}
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

              {field(
                "Location",
                <select
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  className={inputClass}
                >
                  <option value="">Select Location</option>
                  <option value="La Vie Night Club">La Vie Night Club</option>
                  <option value="Noir Bar & Lounge">Noir Bar &amp; Lounge</option>
                </select>
              )}

              <div className="grid grid-cols-2 gap-4">
                {field(
                  "Date",
                  <input
                    type="date"
                    value={editForm.reservationDate}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        reservationDate: e.target.value,
                      })
                    }
                    className={inputClass}
                  />
                )}
                {field(
                  "Time",
                  <select
                    value={editForm.reservationTime}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        reservationTime: e.target.value,
                      })
                    }
                    className={inputClass}
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                )}
              </div>

              {field(
                "Party Size",
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={editForm.partySize}
                  onChange={(e) =>
                    setEditForm({ ...editForm, partySize: e.target.value })
                  }
                  className={inputClass}
                />
              )}

              {field(
                "Occasion (optional)",
                <input
                  value={editForm.occasion}
                  onChange={(e) =>
                    setEditForm({ ...editForm, occasion: e.target.value })
                  }
                  className={inputClass}
                />
              )}

              {field(
                "Notes (optional)",
                <textarea
                  rows={3}
                  value={editForm.notes}
                  onChange={(e) =>
                    setEditForm({ ...editForm, notes: e.target.value })
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
                onClick={() => setDeleteTarget(editingRes)}
                className="text-sm text-red-400 border border-red-400/30 px-4 py-2 rounded-lg hover:bg-red-400/10 transition cursor-pointer"
              >
                Delete Entry
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingRes(null)}
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
            <h2 className="text-lg font-semibold mb-2">Delete Reservation?</h2>
            <p className="text-sm text-gray-400 mb-6">
              This will permanently remove the reservation for{" "}
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
