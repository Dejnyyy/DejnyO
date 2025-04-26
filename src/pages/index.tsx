import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Head from "next/head";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Design",
    description: "Sleek, responsive, music-inspired designs tailored to your vibe.",
    icon: "🌐",
  },
  {
    title: "App Development",
    description: "Cross-platform apps built with performance and personality.",
    icon: "📱",
  },
  {
    title: "Graphic Design",
    description: "From branding to full UI/UX kits — making digital look stunning.",
    icon: "🎨",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const dejnyoTextRef = useRef<HTMLHeadingElement>(null);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 });
    }
  }, []);

  // Services Section Animation
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top+=100 top",
        end: "+=600",
        scrub: true,
        pin: true,
      },
    });

    cardRefs.current.forEach((card, index) => {
      if (card) {
        tl.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            rotate: index % 2 === 0 ? -5 : 5,
          },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1,
          },
          index * 0.2
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Parallax for DejnyO background text
  useEffect(() => {
    if (!dejnyoTextRef.current) return;

    gsap.to(dejnyoTextRef.current, {
      yPercent: -1,
      ease: "none",
      scrollTrigger: {
        trigger: dejnyoTextRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);
  useEffect(() => {
    gsap.to("#frost-layer", {
      opacity: 0.7,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);
  
  const handleSearch = (query: string) => {
    const elements = document.querySelectorAll("section, h1, h2, h3, p");
    elements.forEach((el) => {
      const text = el.textContent?.toLowerCase() || "";
      el.classList.remove("ring-2", "ring-blue-500");
      if (query && text.includes(query.toLowerCase())) {
        el.classList.add("ring-2", "ring-green-500");
      }
    });
  };

  return (
    <div className="bg-black text-white font-sans">
      <Head>
        <title>DejnyO</title>
        <meta name="description" content="DejnyO - Designing next-gen music-focused websites and apps with a punch of aesthetic graphics." />
      </Head>

      {/* Searchbar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="relative p-[2px] rounded-full overflow-hidden gradient-border">
          <div className="relative bg-gray-800/50 backdrop-blur-md rounded-full px-4 py-2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent text-white placeholder-gray-300 outline-none"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
<section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-black px-6">
  {/* Blurred Animated Background */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 opacity-20 rounded-full blur-3xl animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2" />
  </div>
{/* Particle background */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {Array.from({ length: 30 }).map((_, i) => (
    <div
      key={i}
      className="absolute w-1 h-1 bg-white/20 rounded-full animate-particle"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${5 + Math.random() * 10}s`,
        animationDelay: `${Math.random() * 4}s`,
      }}
    />
  ))}
</div>
<div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0" id="frost-layer" />

  {/* Foreground Hero Content */}
  <motion.h1
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.2 }}
    className="text-6xl md:text-8xl font-extrabold mb-6 py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500"
  >
    DejnyO
  </motion.h1>
  

  <motion.p
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 1 }}
    className="text-xl md:text-2xl text-gray-300 max-w-2xl"
  >
    Crafting immersive websites and apps with music, motion, and creativity.
  </motion.p>
</section>


      {/* About Section with Parallax DejnyO */}
      <section className="relative py-32 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Giant floating background text */}
        <h2
          ref={dejnyoTextRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] md:text-[140px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 select-none whitespace-nowrap pointer-events-none opacity-20"
        >
          DejnyO
        </h2>


        {/* Foreground content */}
        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mx-10"
          >
            <h3 className="text-4xl font-bold mb-6 text-blue-400">Who We Are</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              DejnyO is a digital agency blending code with creativity. We specialize in web and app development with a unique edge — most of our projects are rooted in music. Whether it’s a music artist’s portfolio, a fan experience platform, or a custom-built streaming web app, we make sure every beat looks as good as it sounds. Graphic design is a core part of our identity — we believe visuals should move with the rhythm.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={containerRef} className="relative py-36 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-12 relative">
          <h2 className="text-6xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
            What We Create
          </h2>

          <div className="relative w-full h-[400px]">
            {services.map((service, index) => (
              <div
                key={index}
                ref={setCardRef(index)}
                className="absolute bg-white/10 backdrop-blur-xl rounded-3xl p-8 w-80 shadow-2xl hover:scale-105 hover:rotate-0 transition-all duration-500"
                style={{
                  top: index === 0 ? '50px' : index === 1 ? '100px' : '200px',
                  left: index === 0 ? '10%' : index === 1 ? '70%' : '40%',
                }}
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-blue-300">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-400">Need a Website?</h2>
        <p className="text-lg text-gray-300 mb-8">
          We build fully custom websites for individuals, artists, and businesses. Whether you're starting from scratch or need a redesign—we've got you.
        </p>
        <a
          href="mailto:contact@dejnyo.com"
          className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 transition"
        >
          Get a Quote
        </a>
      </section>

      {/* Featured Work */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-blue-400">Our Work</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-gray-100/10 border border-gray-700 p-4 rounded-xl">
            <a href="https://moodify.dejny.eu" target="_blank" rel="noopener noreferrer">
              <h4 className="text-xl font-semibold mb-2 text-blue-300 hover:underline">Moodify</h4>
            </a>
            <p className="text-gray-300">A mood-based music recommendation site with animated transitions and interactive quiz flow.</p>
          </div>
          <div className="bg-gray-100/10 border border-gray-700 p-4 rounded-xl">
            <h4 className="text-xl font-semibold mb-2 text-blue-300">SoundSwipe</h4>
            <p className="text-gray-300">A social music platform where users connect over shared listening habits and playlists.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-black py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 text-blue-400">Let's Create Together</h2>
        <p className="text-lg mb-8 text-gray-400">Interested in working with us? Reach out and let's bring your idea to life.</p>
        <a href="mailto:contact@dejnyo.com" className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition">
          contact@dejnyo.com
        </a>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500 bg-black">
        © {new Date().getFullYear()} DejnyO. Built with code, music & style.
      </footer>
    </div>
  );
}
