import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import VIPReservation from "./VIPReservation";

export default function VIP() {
  const navigate = useNavigate();

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen pt-28 pb-20 px-6 md:px-12 bg-black"
    >
      {/* HERO */}
      <section className="text-center mb-24">
        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-neon tracking-widest"
        >
          VIP EXPERIENCE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg"
        >
          Elevate your night with exclusive access, premium service, and
          unforgettable luxury at La Vie & Noir.
        </motion.p>
      </section>

      {/* VIP OPTIONS */}
      <section className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto mb-28">
        {[
          {
            title: "VIP TABLE",
            price: "Starting at $1000",
            perks: [
              "Prime floor seating",
              "Dedicated server",
              "Complimentary mixers",
              "Priority entry",
            ],
            glow: "purple",
          },
          // {
          //   title: "BOTTLE SERVICE",
          //   price: "Starting at $750",
          //   perks: [
          //     "Premium spirits",
          //     "Private seating area",
          //     "Personal host",
          //     "Custom celebration signage",
          //   ],
          //   glow: "neon",
          // },
          {
            title: "PRIVATE EVENTS",
            price: "Custom Pricing",
            perks: [
              "Corporate & birthday events",
              "Full lounge buyouts",
              "Custom music & lighting",
              "VIP concierge",
            ],
            glow: "teal",
          },
        ].map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="glass rounded-2xl p-10 text-center relative overflow-hidden"
          >
            {/* Glow */}
            <div
              className={`absolute inset-0 blur-3xl opacity-20 ${
                item.glow === "purple"
                  ? "bg-purple-500"
                  : item.glow === "teal"
                  ? "bg-teal-500"
                  : "bg-neon"
              }`}
            />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold tracking-widest mb-4">
                {item.title}
              </h3>
              <p className="text-neon font-semibold mb-6">{item.price}</p>

              <ul className="space-y-3 text-gray-300 mb-8">
                {item.perks.map((perk) => (
                  <li key={perk}>• {perk}</li>
                ))}
              </ul>

              <button onClick={() => navigate('/vip-reservation')} className="px-8 py-3 border border-neon rounded-full hover:bg-neon hover:text-black transition cursor-pointer">
                Reserve Now
              </button>
              <p className="mt-3">Note : Price differs by chioce of alcohol brand</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* EXPERIENCE STRIP */}
      <section className="max-w-6xl mx-auto text-center mb-28">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-widest mb-6"
        >
          WHY GO VIP?
        </motion.h2>

        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          Skip the lines, own the night, and immerse yourself in a world of
          curated sound, elite service, and elevated nightlife experiences.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/contact")}
          className="px-12 py-5 bg-neon text-white rounded-full font-bold tracking-widest shadow-lg cursor-pointer"
        >
          CONTACT VIP HOST
        </motion.button>
      </section>
    </motion.main>
  );
}

