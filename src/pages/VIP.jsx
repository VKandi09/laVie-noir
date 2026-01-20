// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function VIP() {
//   const navigate = useNavigate();

//   return (
//     <motion.main
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.6 }}
//       className="min-h-screen pt-28 pb-20 px-6 md:px-12 bg-black"
//     >
//       {/* HERO */}
//       <section className="text-center mb-24">
//         <motion.h1
//           initial={{ y: 60, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="text-5xl md:text-7xl font-extrabold text-neon tracking-widest"
//         >
//           VIP EXPERIENCE
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg"
//         >
//           Elevate your night with exclusive access, premium service, and
//           unforgettable luxury at La Vie & Noir.
//         </motion.p>
//       </section>

//       {/* VIP OPTIONS */}
//       <section className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto mb-28">
//         {[
//           {
//             title: "VIP TABLE",
//             price: "Starting at $500",
//             perks: [
//               "Prime floor seating",
//               "Dedicated server",
//               "Complimentary mixers",
//               "Priority entry",
//             ],
//             glow: "purple",
//           },
//           {
//             title: "BOTTLE SERVICE",
//             price: "Starting at $750",
//             perks: [
//               "Premium spirits",
//               "Private seating area",
//               "Personal host",
//               "Custom celebration signage",
//             ],
//             glow: "neon",
//           },
//           {
//             title: "PRIVATE EVENTS",
//             price: "Custom Pricing",
//             perks: [
//               "Corporate & birthday events",
//               "Full lounge buyouts",
//               "Custom music & lighting",
//               "VIP concierge",
//             ],
//             glow: "teal",
//           },
//         ].map((item, index) => (
//           <motion.div
//             key={item.title}
//             initial={{ y: 80, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ delay: index * 0.2 }}
//             viewport={{ once: true }}
//             whileHover={{ scale: 1.05 }}
//             className="glass rounded-2xl p-10 text-center relative overflow-hidden"
//           >
//             {/* Glow */}
//             <div
//               className={`absolute inset-0 blur-3xl opacity-20 ${
//                 item.glow === "purple"
//                   ? "bg-purple-500"
//                   : item.glow === "teal"
//                   ? "bg-teal-500"
//                   : "bg-neon"
//               }`}
//             />

//             <div className="relative z-10">
//               <h3 className="text-2xl font-bold tracking-widest mb-4">
//                 {item.title}
//               </h3>
//               <p className="text-neon font-semibold mb-6">{item.price}</p>

//               <ul className="space-y-3 text-gray-300 mb-8">
//                 {item.perks.map((perk) => (
//                   <li key={perk}>• {perk}</li>
//                 ))}
//               </ul>

//               <button className="px-8 py-3 border border-neon rounded-full hover:bg-neon hover:text-black transition">
//                 Reserve Now
//               </button>
//             </div>
//           </motion.div>
//         ))}
//       </section>

//       {/* EXPERIENCE STRIP */}
//       <section className="max-w-6xl mx-auto text-center mb-28">
//         <motion.h2
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-4xl md:text-5xl font-bold tracking-widest mb-6"
//         >
//           WHY GO VIP?
//         </motion.h2>

//         <p className="text-gray-400 max-w-3xl mx-auto text-lg">
//           Skip the lines, own the night, and immerse yourself in a world of
//           curated sound, elite service, and elevated nightlife experiences.
//         </p>
//       </section>

//       {/* CTA */}
//       <section className="text-center">
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/contact")}
//           className="px-12 py-5 bg-neon text-black rounded-full font-bold tracking-widest shadow-lg"
//         >
//           CONTACT VIP HOST
//         </motion.button>
//       </section>
//     </motion.main>
//   );
// }

import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormDropdown from "../components/FormDropdown";

export default function VIP() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState("");
  const [interest, setInterest] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
                className="glass px-4 md:px-6 py-4 rounded-xl bg-transparent outline-none text-white placeholder-gray-400"
              />

              {/* Last Name */}
              <input
                required
                placeholder="Last Name"
                className="glass px-4 md:px-6 py-4 rounded-xl bg-transparent outline-none text-white placeholder-gray-400"
              />

              {/* Email */}
              <input
                required
                type="email"
                placeholder="Email Address"
                className="glass px-4 md:px-6 py-4 rounded-xl bg-transparent outline-none text-white placeholder-gray-400"
              />

              {/* Phone */}
              <input
                type="tel"
                placeholder="Phone (Optional)"
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
                value={location}
                onChange={setLocation}
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
                value={interest}
                onChange={setInterest}
                options={["VIP Table", "Bottle Service", "Private Event"]}
              />

              {/* Message */}
              <textarea
                rows="4"
                placeholder="Anything we should know?"
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

