import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function FormDropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Label */}
      <label className="block mb-2 text-sm text-gray-400">
        {label}
      </label>

      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="glass px-6 py-4 rounded-xl cursor-pointer flex justify-between items-center hover:border-white/30 transition"
      >
        <span className={value ? "text-white" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300"
          size={20}
        />
        {/* <span className="text-xs">▼</span> */}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="absolute z-50 mt-2 w-full bg-black/90 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-xl"
          >
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="px-5 py-3 text-white hover:bg-purple-500/20 transition cursor-pointer"
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
