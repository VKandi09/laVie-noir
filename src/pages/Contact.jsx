import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="min-h-screen pt-32 px-8 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-5xl font-extrabold text-neon mb-6">
          Get In Touch
        </h1>

        <p className="text-gray-300 mb-12">
          For VIP reservations, private events, brand collaborations,
          or general inquiries — connect with us below.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">📍 Locations</h3>
            <p className="text-gray-300">
              La Vie Night Club <br />
              Noir Bar & Lounge
            </p>
          </div>

          <div className="glass p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">📞 Phone</h3>
            <p className="text-gray-300">
              +1 (585) 000-0000
            </p>
          </div>

          <div className="glass p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2">✉️ Email</h3>
            <p className="text-gray-300">
              reservations@lavienoir.com
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
