import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingField({
  label,
  trigger,
  children,
  open,
  setOpen,
}) {
  const containerRef = useRef(null);
  const floatingRef = useRef(null);
  const [position, setPosition] = useState("bottom");

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const floatingHeight = floatingRef.current?.offsetHeight || 250;

      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < floatingHeight && spaceAbove > floatingHeight) {
        setPosition("top");
      } else {
        setPosition("bottom");
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [open]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="block mb-2 text-sm text-gray-400">
          {label}
        </label>
      )}

      {/* Trigger */}
      <div onClick={() => setOpen(!open)}>
        {trigger}
      </div>

      {/* Floating Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={floatingRef}
            initial={{ opacity: 0, y: position === "bottom" ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position === "bottom" ? 10 : -10 }}
            transition={{ duration: 0.25 }}
            className={`absolute z-50 w-full bg-black/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl
              ${
                position === "bottom"
                  ? "mt-2 top-full"
                  : "mb-2 bottom-full"
              }
            `}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
