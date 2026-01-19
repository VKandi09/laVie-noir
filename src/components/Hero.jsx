// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function Hero() {
//   const navigate = useNavigate();
//   return (
//     <section className="h-screen flex flex-col md:flex-row overflow-hidden">
//       {/* LA VIE NIGHT CLUB */}
//       <motion.div
//         onClick={() => navigate("/la-vie")}
//         initial={{
//           x: -200,
//           opacity: 0,
//         }}
//         whileInView={{
//           x: 0,
//           opacity: 1,
//         }}
//         transition={{
//           duration: 0.05,
//         }}
//         whileHover={{
//           flex: 2.5,
//         }}
//         className="flex-1 relative group cursor-pointer transition-all duration-500"
//       >
//         {/* Background */}
//         <div className="absolute inset-0 bg-linear-to-br from-purple-900 via-purple to-black" />

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />

//         {/* Content */}
//         <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
//           <motion.h2
//             initial={{
//               y: 40,
//               opacity: 0,
//             }}
//             whileInView={{
//               y: 0,
//               opacity: 1,
//             }}
//             transition={{
//               delay: 0.4,
//             }}
//             className="text-5xl md:text-6xl font-extrabold text-white"
//           >
//             LA VIE
//           </motion.h2>

//           <p className="mt-4 text-gray-300 max-w-md">
//             High-energy nightlife, world-class DJs, immersive lighting & premium
//             sound.
//           </p>

//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             onClick={(e) => {
//               e.stopPropagation();
//               navigate("/la-vie");
//             }}
//             className="mt-8 px-8 py-4 border border-neon rounded-full text-white"
//           >
//             Explore Night Club
//           </motion.button>
//         </div>
//       </motion.div>

//       {/* NOIR BAR & LOUNGE */}
//       <motion.div
//         onClick={() => navigate("/noir")}
//         initial={{ x: 200, opacity: 0 }}
//         whileInView={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.05 }}
//         whileHover={{ flex: 2.5 }}
//         className="flex-1 relative group cursor-pointer transition-all duration-500"
//       >
//         {/* Background */}
//         <div className="absolute inset-0 bg-linear-to-br from-teal-900 via-teal to-black" />

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/50 group-hover:bg-black/25 transition" />

//         {/* Content */}
//         <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
//           <motion.h2
//             initial={{ y: 40, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="text-5xl md:text-6xl font-extrabold text-white"
//           >
//             NOIR
//           </motion.h2>

//           <p className="mt-4 text-gray-400 max-w-md">
//             Sophisticated cocktails, ambient music, intimate lounge experience.
//           </p>

//           <motion.button
//             whileHover={{ scale: 1.1 }}
//             onClick={(e) => {
//               e.stopPropagation();
//               navigate("/noir");
//             }}
//             className="mt-8 px-8 py-4 border border-white rounded-full text-white"
//           >
//             Explore Bar & Lounge
//           </motion.button>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import lavieImg from "/images/lavie-bg.jpg";
import noirImg from "/images/noir-bg.jpg";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* LA VIE NIGHT CLUB */}
      <motion.div
        onClick={() => navigate("/la-vie")}
        initial={{ x: -150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ flex: 2.5 }}
        className="flex-1 relative group cursor-pointer transition-all duration-700"
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${lavieImg})` }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1.2 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-purple-900/70 via-black/60 to-black" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold tracking-widest text-white"
          >
            LA VIE
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-gray-300 max-w-md"
          >
            High-energy nightlife, world-class DJs, immersive lighting &
            premium sound.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.12 }}
            onClick={(e) => {
              e.stopPropagation();
              navigate("/la-vie");
            }}
            className="mt-8 px-10 py-4 border border-purple-400 text-white rounded-full backdrop-blur-md"
          >
            Explore Night Club
          </motion.button>
        </div>
      </motion.div>

      {/* NOIR BAR & LOUNGE */}
      <motion.div
        onClick={() => navigate("/noir")}
        initial={{ x: 150, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={{ flex: 2.5 }}
        className="flex-1 relative group cursor-pointer transition-all duration-700"
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${noirImg})` }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1.2 }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-teal-900/70 via-black/60 to-black" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold tracking-widest text-white"
          >
            NOIR
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-gray-400 max-w-md"
          >
            Sophisticated cocktails, ambient music, intimate lounge experience.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.12 }}
            onClick={(e) => {
              e.stopPropagation();
              navigate("/noir");
            }}
            className="mt-8 px-10 py-4 border border-teal-300 text-white rounded-full backdrop-blur-md"
          >
            Explore Bar & Lounge
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

