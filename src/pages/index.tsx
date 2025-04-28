import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Head from "next/head";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt from 'react-parallax-tilt';

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
  useEffect(() => {
    if (!containerRef.current) return;
  
    const isMobile = window.innerWidth <= 768; // Mobile if screen is smaller than 768px
  
    if (isMobile) {
      // 💥 No animations on mobile, cards are just static
      cardRefs.current.forEach((card) => {
        if (card) {
          gsap.set(card, {
            opacity: 1,
            y: 0,
            rotate: 0,
          });
        }
      });
    } else {
      // 🖥️ Desktop animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top+=100 top",
          end: "+=400",
          scrub: 0.1,
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
    }
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
    <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 opacity-20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
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
           <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
           Who We Are</h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              DejnyO is a digital agency blending code with creativity. We specialize in web and app development with a unique edge — most of our projects are rooted in music. Whether it’s a music artist’s portfolio, a fan experience platform, or a custom-built streaming web app, we make sure every beat looks as good as it sounds. Graphic design is a core part of our identity — we believe visuals should move with the rhythm.
            </p>
          </motion.div>
        </div>
      </section>
      <section ref={containerRef} className="relative py-36 bg-black overflow-hidden">
  <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-12 relative">
    <h2 className="text-6xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
      What We Create
    </h2>

    {/* Desktop Layout */}
    <div className="relative w-full h-[400px] hidden md:block">
      {services.map((service, index) => (
        <div
          key={index}
          ref={setCardRef(index)}
          className="absolute group bg-gradient-to-br from-gray-200/10 via-gray-300/10 to-gray-400/10 border border-gray-600 hover:border-blue-400 backdrop-blur-md rounded-3xl p-8 w-80 shadow-md hover:scale-105 hover:rotate-0 transition-all duration-500"
          style={{
            top: index === 0 ? '50px' : index === 1 ? '100px' : '200px',
            left: index === 0 ? '10%' : index === 1 ? '70%' : '40%',
          }}
        >
          <div className="text-5xl mb-4">{service.icon}</div>
          <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 group-hover:-translate-y-1 transition-transform duration-300">
            {service.title}
          </h3>
          <p className="text-gray-400">{service.description}</p>
        </div>
      ))}
    </div>

    {/* Mobile Layout */}
    <div className="grid grid-cols-1 gap-8 md:hidden">
      {services.map((service, index) => (
        <div
          key={index}
          className="group bg-gradient-to-br from-gray-200/10 via-gray-300/10 to-gray-400/10 border border-gray-600 hover:border-blue-400 backdrop-blur-md rounded-3xl p-8 w-full shadow-md hover:scale-105 transition-all duration-500"
        >
          <div className="text-5xl mb-4">{service.icon}</div>
          <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 group-hover:-translate-y-1 transition-transform duration-300">
            {service.title}
          </h3>
          <p className="text-gray-400">{service.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>



{/* Offer Section - Updated Pricing Models */}
<section className="py-24 px-6 max-w-7xl mx-auto text-center">
  <h2 className="text-5xl font-bold mb-16 text-blue-400">Need a Website?</h2>

  <div className="grid md:grid-cols-3 gap-10 items-start">
    {/* Basic Plan */}
    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500 flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold text-blue-300 mb-2">Basic</h3>
        <p className="text-3xl font-extrabold text-white mb-1">$10<span className="text-lg font-normal">/month</span></p>
        <p className="text-gray-300 mb-6">
          Starter package. Hosting, domain, security, and lifetime updates for different events and occasions.
        </p>
      </div>
      <a
        href="mailto:contact@dejnyo.com"
        className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition"
      >
        Subscribe
      </a>
    </div>

    {/* Pro Plan (Highlighted) */}
    <div className="bg-gradient-to-br from-blue-600/60 hover:from-cyan-500/50 hover:via-blue-600/60 hover:to-cyan-700/50 via-cyan-500/50 to-blue-700/50 p-10 rounded-3xl shadow-2xl hover:scale-110 hover:shadow-blue-500/30 transition-all duration-500 flex flex-col justify-between transform md:-translate-y-6 border-2 border-blue-400">
      <div>
        <h3 className="text-3xl font-bold text-white mb-2">Pro</h3>
        <p className="text-4xl font-extrabold text-white mb-1">$99</p>
        <p className="text-gray-200 mb-6">
          One-time payment. Professional custom site with SEO, unique animations, and branding polish.
        </p>
      </div>
      <a
        href="mailto:contact@dejnyo.com"
        className="mt-6 inline-block bg-white hover:bg-gray-200 hover:scale-105 text-black font-bold py-2 px-6 rounded-full transition"
      >
        Get a Quote
      </a>
    </div>

    {/* Elite Plan */}
    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500 flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-bold text-blue-300 mb-2">Elite</h3>
        <p className="text-3xl font-extrabold text-white mb-1">$199</p>
        <p className="text-gray-300 mb-6">
          Full custom solution. Web apps, e-commerce, interactive design — tailor-made to your needs.
        </p>
      </div>
      <a
        href="mailto:contact@dejnyo.com"
        className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition"
      >
        Get a Quote
      </a>
    </div>
  </div>
</section>

{/* Our Team Section */}
<section className="py-32 px-6 max-w-7xl mx-auto text-center">
  <h2 className="text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
    Our Team
  </h2>

  <div className="grid md:grid-cols-2 gap-10">
    {/* Team Member 1 */}
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.02} tiltMaxAngleX={10} tiltMaxAngleY={10}>
        <div className="group relative bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-2 border-blue-400 animate-pulse-slow overflow-hidden hover:scale-105 transition-all duration-500 text-center">
          {/* Floating Shine */}
          <div className="absolute top-0 left-[-75%] w-[50%] h-full bg-white/20 transform skew-x-[-30deg] group-hover:left-[125%] transition-all duration-500 ease-in-out rounded-3xl"></div>
          <h3 className="text-2xl font-bold text-blue-300 mb-2">Dejny</h3>
          <p className="text-gray-400 mb-2">Founder & Developer</p>
          <p className="text-gray-500 text-sm mb-2 italic">&quot;Building beats with code.&quot;</p>
          <p className="text-gray-500 text-xs">Leading the creative vision of DejnyO.</p>
        </div>
      </Tilt>
    </motion.div>

    {/* Team Member 2 */}
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
    >
      <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.02} tiltMaxAngleX={10} tiltMaxAngleY={10}>
        <div className="group relative bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-2 border-blue-400 animate-pulse-slow overflow-hidden hover:scale-105 transition-all duration-500 text-center">
          {/* Floating Shine */}
          <div className="absolute top-0 left-[-75%] w-[50%] h-full bg-white/20 transform skew-x-[-30deg] group-hover:left-[125%] transition-all duration-500 ease-in-out rounded-3xl"></div>

          <h3 className="text-2xl font-bold text-blue-300 mb-2">Oskkys</h3>
          <p className="text-gray-400 mb-2">Creative Partner</p>
          <p className="text-gray-500 text-sm mb-2 italic">&quot;Energy behind every idea.&quot;</p>
          <p className="text-gray-500 text-xs">Shaping the energy and feel of every project.</p>
        </div>
      </Tilt>
    </motion.div>
  </div>
</section>

{/* Our Work Section */}
<section className="py-32 px-6 max-w-7xl mx-auto text-center">
  {/* Gradient Title */}
  <h2 className="text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
    Our Work
  </h2>

  <div className="grid md:grid-cols-2 gap-10">
    {[
      {
        title: "Moodify",
        description: "A mood-based music recommendation site with animated transitions and interactive quiz flow.",
        href: "https://moodify.dejny.eu",
      },
      {
        title: "SoundSwipe",
        description: "A social music platform where users connect over shared listening habits and playlists.",
        href: "#",
      },
      {
        title: "HearMe",
        description: "Website about voting best song everyday and showing people what kind of music is trendy each day",
        href: "https://hearme.dejny.eu",
      },
      // 🔥 ADD MORE PROJECTS HERE
    ].map((project, index, array) => {
      const isLastOdd = array.length % 2 === 1 && index === array.length - 1;
      return (
        <motion.a
          key={index}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
          className={`group block bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/60 border border-gray-700 rounded-2xl p-10 text-left transition-transform duration-300 hover:-translate-y-3 hover:border-blue-400 ${
            isLastOdd ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""
          }`}
        >
          <h3 className="text-2xl font-bold text-blue-300 mb-3 group-hover:-translate-y-1 transition-transform duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400">{project.description}</p>
        </motion.a>
      );
    })}
  </div>
</section>


{/* Contact Section */}
<section className="py-36 px-6  mx-auto text-center relative overflow-hidden">
  {/* Optional subtle background gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/50 pointer-events-none"></div>

  <h2 className="text-5xl md:text-6xl font-extrabold mb-8 py-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
    Let&apos;s Create Together
  </h2>

  <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
    Your ideas deserve more than templates. Let&apos;s build something unforgettable — coded, crafted, and customized by DejnyO.
  </p>

  <a
    href="mailto:contact@dejnyo.com"
    className="inline-block bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 text-white  font-bold py-4 px-10 rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
  >
    contact@dejnyo.com
  </a>
</section>


   {/* Footer */}
<footer className="py-4 text-center text-sm text-gray-500 bg-black relative overflow-hidden">
  {/* Divider line */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-11/12 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="relative z-10"
  >
    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400/70 via-cyan-400 to-blue-500/70 mb-1">
      © {new Date().getFullYear()} DejnyO
    </p>
  </motion.div>
</footer>

    </div>
  );
}
