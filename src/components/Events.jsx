import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
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
    </section>
  );
}

