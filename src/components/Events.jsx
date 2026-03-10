import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { EVENTS } from "../data/eventsData.js";

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      ".event-card",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".events",
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section className="events py-20 px-8">
      <h2 className="text-4xl font-bold mb-12 text-center text-neon">
        Upcoming Events
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {EVENTS.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(`/events/${event.id}`)}
            className="event-card group relative flex flex-col rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-2xl"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              {/* Location badge */}
              <span className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm border border-white/20 text-xs text-white px-2.5 py-1 rounded-full">
                <MapPin size={11} />
                {event.location}
              </span>

              {/* Price badge */}
              <span className="absolute top-3 right-3 bg-neon/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {event.price}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 bg-zinc-900/80 p-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-400 border border-white/10 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-1">
                {event.title}
              </h3>
              <p className="text-sm text-gray-400 mb-3">{event.subtitle}</p>

              {/* Date & Time */}
              <div className="flex items-center gap-1.5 text-sm text-gray-300 mb-1">
                <Clock size={13} className="text-gray-500 shrink-0" />
                {event.date}
              </div>
              <div className="text-sm text-gray-400 pl-4.5 mb-4">
                {event.time}
              </div>

              {/* Short description */}
              <p className="text-sm text-gray-400 line-clamp-2 flex-1">
                {event.shortDescription}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-1 mt-4 text-sm font-semibold text-white group-hover:gap-2 transition-all">
                View Details
                <ArrowRight size={15} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Host an Event section */}
      <h2 className="text-4xl font-bold m-12 text-center text-neon">
        Want to Host an Event?
      </h2>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-gray-300 mb-6">
          Whether it's a birthday, corporate gathering, or special celebration,
          La Vie - Noir offers the perfect ambiance for your event. Contact us
          to learn more about our event hosting options and packages.
        </p>
        <button
          onClick={() => navigate("/contact")}
          className="px-8 py-4 bg-neon text-white rounded-full font-bold tracking-widest hover:border-2 transition cursor-pointer"
        >
          Contact Us
        </button>
      </div>
    </section>
  );
}
