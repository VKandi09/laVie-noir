import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import noirHero from "/images/noir-hero.jpg";
import cocktail1 from "/images/cocktail1.jpg";
import cocktail2 from "/images/cocktail2.jpg";
import cocktail3 from "/images/cocktail3.jpg";

export default function Noir() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white">

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${noirHero})` }}
        />

        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-widest">
            Coming soon
          </h1>
          <h1 className="mt-6 text-6xl md:text-7xl font-extrabold tracking-widest">
            NOIR
          </h1>
          <p className="mt-6 text-gray-300 max-w-xl mx-auto">
            An intimate bar & lounge experience where craft cocktails,
            ambient music, and elegance meet.
          </p>
        </motion.div>
      </section>

      {/* AMBIENCE SECTION */}
      <section className="py-24 px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-teal-300">
            The Noir Ambience
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Designed for conversation and connection, Noir offers a refined
            atmosphere with low lighting, plush seating, curated playlists,
            and an upscale crowd. Perfect for date nights, after-hours drinks,
            and private celebrations.
          </p>
        </motion.div>
      </section>

      {/* SIGNATURE COCKTAILS */}
      <section className="py-24 px-8 bg-linear-to-b from-black to-zinc-900">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16 text-teal-300"
        >
          Signature Cocktails
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[cocktail1, cocktail2, cocktail3].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="glass rounded-xl overflow-hidden hover:scale-105 transition"
            >
              <img src={img} alt="Cocktail" className="h-64 w-full object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Noir Special #{i + 1}
                </h3>
                <p className="text-gray-300 text-sm">
                  Handcrafted cocktails with premium spirits and bold flavors.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </section>

      {/* LOUNGE EXPERIENCE */}
      <section className="py-24 px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-4xl font-bold mb-6 text-teal-300">
              Lounge • Relax • Indulge
            </h2>
            <p className="text-gray-300 leading-relaxed">
              From smooth jazz evenings to deep-house nights, Noir sets the tone
              with carefully curated sounds and an elevated drink menu. Our
              lounge is crafted for those who appreciate understated luxury.
            </p>
          </div>

          <div className="glass rounded-2xl p-10 text-center">
            <p className="text-xl italic text-gray-200">
              “Where the night slows down and sophistication takes over.”
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 bg-linear-to-b from-zinc-900 to-black text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 text-teal-300"
        >
          Reserve Your Night at Noir
        </motion.h2>

        <motion.button
          onClick={() => navigate("/contact")}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-10 py-4 border border-teal-300 rounded-full text-white backdrop-blur-md hover:bg-teal-300/10 transition cursor-pointer"
        >
          Book a Table
        </motion.button>
      </section>
    </div>
  );
}

