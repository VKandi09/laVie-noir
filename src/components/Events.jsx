import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { nav } from "framer-motion/client";

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
      <div className="grid md:grid-cols-3 gap-8">
        {["DJ Night", "Neon Party", "Ladies Night"].map((event) => (
          <div
            key={event}
            className="event-card glass p-8 rounded-xl hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold text-white">{event}</h3>
            <p className="text-gray-200 mt-2">
              Friday • 10PM Onwards
            </p>
          </div>
        ))}
      </div>
      <h2 className="text-4xl font-bold m-12 text-center text-neon">
        Want to Host an Event?
      </h2>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-gray-300 mb-6">
          Whether it's a birthday, corporate gathering, or special celebration,
          La Vie - Noir offers the perfect ambiance for your event. Contact us to
          learn more about our event hosting options and packages.
        </p>
        <button
          onClick={() => navigate("/contact")} 
          className="px-8 py-4 bg-neon text-white rounded-full font-bold tracking-widest hover:border-2 transition cursor-pointer">
          Contact Us
        </button>
      </div>
    </section>
  );
}

