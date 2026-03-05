import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Calendar, Tag, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import { EVENTS } from "../data/eventsData.js";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = EVENTS.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-8">
        <h2 className="text-3xl font-bold">Event Not Found</h2>
        <p className="text-gray-400">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 border border-white/20 rounded-full text-sm font-semibold hover:bg-white/10 transition cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      {/* Back Button */}
      <div className="absolute top-20 left-6 z-20">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-2 rounded-full hover:bg-white/10 transition cursor-pointer"
        >
          <ArrowLeft size={15} />
          Back to Home
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative h-[55vh] w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

        {/* Hero text overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="flex flex-wrap gap-2 mb-3">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-xs border border-white/20 text-gray-300 px-2.5 py-0.5 rounded-full"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-1">
            {event.title}
          </h1>
          <p className="text-lg text-gray-400">{event.subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 space-y-12">

        {/* Key Info Bar */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="glass rounded-xl p-4 flex items-start gap-3">
            <Calendar size={18} className="text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Date</p>
              <p className="text-sm font-medium">{event.date}</p>
            </div>
          </div>
          <div className="glass rounded-xl p-4 flex items-start gap-3">
            <Clock size={18} className="text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Time</p>
              <p className="text-sm font-medium">{event.time}</p>
            </div>
          </div>
          <div className="glass rounded-xl p-4 flex items-start gap-3">
            <MapPin size={18} className="text-gray-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Location</p>
              <p className="text-sm font-medium">{event.location}</p>
              <p className="text-xs text-gray-500 mt-0.5">{event.address}</p>
            </div>
          </div>
        </div>

        {/* About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">About This Event</h2>
          <div className="space-y-4">
            {event.fullDescription.split("\n\n").map((para, i) => (
              <p key={i} className="text-gray-300 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Lineup */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Lineup</h2>
          <div className="flex flex-wrap gap-3">
            {event.lineup.map((name) => (
              <span
                key={name}
                className="glass px-4 py-2 rounded-full text-sm font-medium text-white border border-white/10"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Event Highlights</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {event.highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-3 glass rounded-xl px-4 py-3 text-sm text-gray-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neon shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Ticket CTA */}
        <div className="glass rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full border border-white/10 bg-white/5">
              <Ticket size={24} className="text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">
                Admission
              </p>
              <p className="text-2xl font-bold text-white">{event.price}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                per person · doors open at{" "}
                {event.time.split("–")[0].trim()}
              </p>
            </div>
          </div>
          <button
            onClick={() =>
              navigate("/reservations", {
                state: { occasion: event.title },
              })
            }
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition cursor-pointer text-sm tracking-wide"
          >
            <Ticket size={16} />
            Reserve a Table
          </button>
        </div>
      </div>
    </motion.div>
  );
}
