import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { BrandMarquee } from "@/components/site/Marquee";
import { Manifesto } from "@/components/site/Manifesto";
import { Features } from "@/components/site/Features";
import { Downloads } from "@/components/site/Downloads";
import { Subscribe } from "@/components/site/Subscribe";
import { Footer } from "@/components/site/Footer";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App noise-overlay relative bg-sv-bg text-white min-h-screen">
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#16161a",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
          },
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <BrandMarquee />
        <Manifesto />
        <Features />
        <Downloads />
        <Subscribe />
      </main>
      <Footer />
    </div>
  );
}

export default App;
