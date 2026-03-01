// import { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { DayPicker } from "react-day-picker";
// import { format } from "date-fns";
// import { ChevronDown } from "lucide-react";
// import "react-day-picker/dist/style.css";

// export default function FormCalendar({
//   label,
//   placeholder,
//   value,
//   onChange,
// }) {
//   const [open, setOpen] = useState(false);
//   const containerRef = useRef(null);

//   const today = new Date();
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         containerRef.current &&
//         !containerRef.current.contains(event.target)
//       ) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
//   return (
//     <div
//       ref={containerRef}
//       onMouseEnter={() => setOpen(true)}
//       onMouseLeave={() => setOpen(false)}
//       className="relative"
//     >
//       {/* Label */}
//       <label className="block mb-2 text-sm text-gray-400">
//         {label}
//       </label>

//       {/* Trigger */}
//       <div
//         onClick={() => setOpen(!open)}
//         className="glass px-6 py-4 rounded-xl cursor-pointer flex justify-between items-center hover:border-white/30 transition"
//       >
//         <span className={value ? "text-white" : "text-gray-400"}>
//           {value ? format(value, "MM/dd/yyyy") : placeholder}
//         </span>

//         <ChevronDown
//           className="text-gray-300"
//           size={20}
//         />
//       </div>

//       {/* Animated Calendar */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             transition={{ duration: 0.25 }}
//             className="absolute z-50 mt-2 items-centerw-full bg-black/95 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl"
//           >
//             <DayPicker
//               mode="single"
//               selected={value}
//               onSelect={(date) => {
//                 if (!date) return;
//                 onChange(date);
//                 setOpen(false);
//               }}
//               disabled={{ before: today }}
//               styles={{
//                 caption: { color: "white" },
//                 day: { color: "white" },
//                 head_cell: { color: "#aaa" },
//               }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import FloatingField from "./FloatingField";
import "react-day-picker/dist/style.css";

export default function FormCalendar({
  label,
  placeholder,
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const today = new Date();

  return (
    <FloatingField
      label={label}
      open={open}
      setOpen={setOpen}
      trigger={
        <div className="glass px-6 py-4 rounded-xl cursor-pointer flex justify-between items-center hover:border-white/30 transition">
          <span className={value ? "text-white" : "text-gray-400"}>
            {value ? format(value, "MM/dd/yyyy") : placeholder}
          </span>
          { open ? (
            <ChevronUp
              className="text-gray-300"
              size={20}
            />
          ) : ( 
          <ChevronDown
            className="text-gray-300"
            size={20}
          />
          )}
        </div>
      }
    >
      <div className="p-4">
        <DayPicker
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (!date) return;
            onChange(date);
            setOpen(false);
          }}
          disabled={{ before: today }}
          styles={{
            caption: { color: "white" },
            day: { color: "white" },
            head_cell: { color: "#aaa" },
          }}
        />
      </div>
    </FloatingField>
  );
}
