import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  // Decide branding text based on page
  const pageBrand = location.pathname.includes("/la-vie")
    ? "LA VIE Night Club"
    : location.pathname.includes("/noir")
    ? "NOIR Bar & Lounge"
    : "LA VIE - NOIR";

  return (
    <footer className="bg-black/80 backdrop-blur-md border-t border-white/10 text-gray-400 text-center md:text-start">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white tracking-wider">
            {pageBrand}
          </h2>
          <p className="mt-4 text-sm leading-relaxed">
            An immersive nightlife experience where music, drinks, and vibes
            meet luxury and style.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li
              onClick={() => navigate("/")}
              className="hover:text-white cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document
                    .querySelector(".events")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 200);
              }}
              className="hover:text-white cursor-pointer"
            >
              Upcoming Events
            </li>
            <li onClick={() => navigate('/la-vie')} className="hover:text-white cursor-pointer">La Vie</li>
            <li onClick={() => navigate('/noir')} className="hover:text-white cursor-pointer">Noir</li>
            <li onClick={() => navigate('/gallery')} className="hover:text-white cursor-pointer">Gallery</li>
            <li onClick={() => navigate('/reservations')}className="hover:text-white cursor-pointer">Reservations</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="">
          <h3 className="text-white font-semibold mb-4">Visit Us</h3>
          <p className="text-sm">
            1 Ryan Alley
            <br />
            Rochester, NY 14607
          </p>
          <p className="mt-2 text-sm">Fri – Sun • 9PM – 3AM</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5 text-xl text-center justify-center md:justify-start">
            <FaInstagram className="hover:text-white cursor-pointer transition" />
            <FaFacebookF className="hover:text-white cursor-pointer transition" />
            <FaXTwitter className="hover:text-white cursor-pointer transition" />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-4 text-center text-sm">
        © {new Date().getFullYear()} {pageBrand}. All rights reserved.
      </div>
    </footer>
  );
}
