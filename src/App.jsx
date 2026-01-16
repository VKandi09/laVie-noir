import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Locations from "./components/Locations";
// import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      {/* <Hero /> */}
      <Locations />
      {/* <Events /> */}
      {/* <Gallery /> */}
      <Footer />
    </div>
  );
}


