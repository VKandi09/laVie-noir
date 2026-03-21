import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { adminFetch } from "../utils/adminFetch.js";
import { AdminAuthContext } from "./AdminAuthContext";

export default function AdminSettings() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AdminAuthContext);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const inputClass =
    "w-full bg-zinc-800 border border-white/20 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-white/50";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (form.newPassword !== form.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (form.newPassword.length < 8) {
      setMessage({ type: "error", text: "New password must be at least 8 characters." });
      return;
    }

    setSaving(true);
    try {
      const res = await adminFetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/password`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage({ type: "success", text: "Password updated. Logging you out…" });
      setTimeout(() => {
        localStorage.removeItem("adminToken");
        setIsAuthenticated(false);
        navigate("/admin/login");
      }, 2000);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-16 max-w-md">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-5">Change Password</h2>

        {message && (
          <p className={`text-sm mb-4 ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Current Password</label>
            <input
              type="password"
              value={form.currentPassword}
              onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">New Password</label>
            <input
              type="password"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className={inputClass}
              required
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full mt-2 bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition cursor-pointer"
          >
            {saving ? "Saving…" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
