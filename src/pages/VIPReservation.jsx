import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormDropdown from "../components/FormDropdown";

export default function VIPReservation() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  // const [location, setLocation] = useState("");
  // const [interest, setInterest] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    interest: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/vip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit VIP request");
      }

      setSubmitted(true); // show success UI
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-28 pb-20 px-4 md:px-12 bg-black flex items-center justify-center"
    >
      <div className="max-w-5xl w-full glass rounded-3xl p-8 md:p-16 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 via-transparent to-teal-500/20 blur-3xl" />

        <div className="relative z-10">
          {/* Header */}
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-widest text-neon text-center"
          >
            VIP Reservations
          </motion.h1>

          <p className="mt-6 text-gray-400 text-center max-w-2xl mx-auto">
            Be the first to know when VIP tables and bottle service officially
            open at <br/> <span className="text-white">La Vie</span> &{" "}
            <span className="text-white">Noir</span>.
          </p>

          {/* FORM / SUCCESS */}
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mt-14 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {/* First Name */}
              <input
                required
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="glass px-4 md:px-6 py-4 rounded-xl bg-transparent outline-none text-white placeholder-gray-400"
              />

              {/* Last Name */}
              <input
                required
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="glass px-4 md:px-6 py-4 rounded-xl bg-transparent outline-none text-white placeholder-gray-400"
              />

              {/* Email */}
              <input
                required
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="glass px-4 md:px-6 py-4 rounded-xl bg-transparent outline-none text-white placeholder-gray-400"
              />

              {/* Phone */}
              <input
                type="tel"
                placeholder="Phone (Optional)"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="glass px-4 md:px-6 py-4 rounded-xl bg-transparent outline-none text-white placeholder-gray-400"
              />

              {/* Location */}
              {/* <select
                required
                className="glass px-6 py-4 rounded-xl bg-black text-white outline-none"
              >
                <option value="">Preferred Location</option>
                <option>La Vie Night Club</option>
                <option>Noir Bar & Lounge</option>
              </select> */}
              <FormDropdown
                label="Preferred Location"
                placeholder="Select Location"
                value={formData.location}
                onChange={(value) =>
                  setFormData({ ...formData, location: value })
                }
                options={["La Vie Night Club", "Noir Bar & Lounge"]}
              />

              {/* Interest */}
              {/* <select
                required
                className="glass px-6 py-4 rounded-xl bg-black text-white outline-none md:col-span-2"
              >
                <option value="">Interested In</option>
                <option>VIP Table</option>
                <option>Bottle Service</option>
                <option>Private Event</option>
              </select> */}
              <FormDropdown
                className="glass px-4 md:px-6 py-4 rounded-xl bg-black text-white outline-none md:col-span-2"
                label="Interested In"
                placeholder="Select Experience"
                value={formData.interest}
                onChange={(value) =>
                  setFormData({ ...formData, interest: value })
                }
                options={["VIP Table", "Private Event"]}
              />

              {/* Message */}
              <textarea
                rows="4"
                placeholder="Anything we should know?"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="glass px-4 md:px-6 py-4 rounded-xl bg-transparent outline-none text-white placeholder-gray-400 md:col-span-2"
              />

              {/* Submit */}
              <button
                type="submit"
                className="md:col-span-2 mt-6 px-12 py-4 bg-neon text-white border-2 border-white rounded-full font-bold tracking-widest hover:scale-105 transition cursor-pointer"
              >
                JOIN VIP LIST
              </button>
            </form>
          ) : (
            /* SUCCESS MESSAGE */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-20 text-center"
            >
              <h3 className="text-3xl font-bold text-white mb-4">
                You’re on the list 🥂
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Our VIP host will notify you as soon as reservations go live.
                Get ready for an elevated nightlife experience.
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