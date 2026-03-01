import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormDropdown from "../components/FormDropdown";
import FormCalendar from "../components/FormCalendar";
import { format } from "date-fns";

const timeSlots = [
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
  "12:00 AM",
  "1:00 AM",
  "2:00 AM",
];

const partySizes = Array.from({ length: 20 }, (_, i) => `${i + 1}`);

export default function Reservations() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reservationDate: null,
    reservationTime: "",
    partySize: "2",
    occasion: "",
    notes: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.reservationDate || !form.reservationTime) {
      alert("Please select date and time");
      return;
    }

    const payload = {
      ...form,
      reservationDate: format(form.reservationDate, "MM/dd/yyyy"),
      partySize: Number(form.partySize),
    };

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/reservations`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();

    if (res.ok) {
      setSuccess(true);
    } else {
      alert(data.message || "Reservation failed");
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-28 pb-20 px-4 md:px-12 bg-black"
    >
      <div className="max-w-5xl w-full glass rounded-3xl p-8 md:p-16 relative overflow-hidden mx-auto">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 via-transparent to-teal-500/20 blur-3xl" />

        <div className="relative z-10">
          {/* Header */}
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-widest text-neon text-center"
          >
            GENERAL RESERVATIONS
          </motion.h1>

          <p className="mt-6 text-gray-400 text-center max-w-2xl mx-auto">
            Reserve your table and experience an unforgettable night at {" "}
            <span className="text-white">La Vie</span> &{" "}
            <span className="text-white">Noir</span>.
          </p>

          {/* FORM OR SUCCESS */}
          {!success ? (
            <form
              onSubmit={handleSubmit}
              className="mt-14 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {/* First Name */}
              <input
                required
                placeholder="First Name"
                value={form.firstName}
                name="firstName"
                onChange={handleChange}
                className="glass px-4 md:px-6 py-4 rounded-xl bg-transparent outline-none text-white placeholder-gray-400"
              />

              {/* Last Name */}
              <input
                required
                placeholder="Last Name"
                value={form.lastName}
                name="lastName"
                onChange={handleChange}
                className="glass px-4 md:px-6 py-4 rounded-xl bg-transparent outline-none text-white placeholder-gray-400"
              />

              {/* Email */}
              <input
                required
                type="email"
                placeholder="Email Address"
                value={form.email}
                name="email"
                onChange={handleChange}
                className="glass px-4 md:px-6 py-4 rounded-xl bg-transparent outline-none text-white placeholder-gray-400"
              />

              {/* Phone */}
              <input
                required
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                name="phone"
                onChange={handleChange}
                className="glass px-4 md:px-6 py-4 rounded-xl bg-transparent outline-none text-white placeholder-gray-400"
              />

              {/* Animated Calendar */}
              <FormCalendar
                label="Reservation Date"
                placeholder="Select Date"
                value={form.reservationDate}
                onChange={(date) =>
                  setForm({ ...form, reservationDate: date })
                }
              />

              {/* Time Dropdown */}
              <FormDropdown
                label="Reservation Time"
                placeholder="Select Time"
                value={form.reservationTime}
                onChange={(value) =>
                  setForm({ ...form, reservationTime: value })
                }
                options={timeSlots}
              />

              {/* Party Size Dropdown */}
              <FormDropdown
                label="Party Size"
                placeholder="Select Party Size"
                value={form.partySize}
                onChange={(value) =>
                  setForm({ ...form, partySize: value })
                }
                options={partySizes}
              />

              {/* Occasion */}
              <input
                placeholder="Occasion (Optional)"
                name="occasion"
                value={form.occasion}
                onChange={handleChange}
                className="glass mt-5 px-4 md:px-6 py-4 rounded-xl bg-transparent outline-none text-white placeholder-gray-400"
              />

              {/* Notes */}
              <textarea
                rows="4"
                placeholder="Special Requests"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="glass px-4 md:px-6 py-4 rounded-xl bg-transparent outline-none text-white placeholder-gray-400 md:col-span-2"
              />

              {/* Submit */}
              <button
                type="submit"
                className="md:col-span-2 mt-6 px-12 py-4 bg-neon text-white border-2 border-white rounded-full font-bold tracking-widest hover:scale-105 transition cursor-pointer"
              >
                RESERVE NOW
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-20 text-center"
            >
              <h3 className="text-3xl font-bold text-white mb-4">
                Reservation Received 🥂
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Our host team will contact you shortly to confirm your
                reservation. Get ready for an elevated nightlife experience.
              </p>

              <button
                onClick={() => navigate("/")}
                className="mt-10 px-10 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition"
              >
                BACK TO HOME
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.main>
  );
}
