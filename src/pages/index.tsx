import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Head from "next/head";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MeapFloat from "@/components/MeapFloat";
import Navbar from '@/components/NavBar';
import { FlipCard } from "@/components/FlipCard";
import Image from "next/image";

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
  const [theme, setTheme] = useState<"light" | "dark">("dark"); // 🌙/☀️ toggle

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

  // Update document body class for dark/light mode
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("bg-black");
      document.body.classList.remove("bg-white");
    } else {
      document.body.classList.add("bg-white");
      document.body.classList.remove("bg-black");
    }
  }, [theme]);
  useEffect(() => {
    document.body.style.backgroundColor = theme === 'dark' ? '#000000' : '#ffffff';
  }, [theme]);

  return (
    <div className={`transition-colors duration-500 ${theme === "dark" ? "text-white" : "text-black"} font-sans`}>
    <Head>
      <title>DejnyO</title>
      <meta name="description" content="DejnyO - Designing next-gen music-focused websites and apps with a punch of aesthetic graphics." />
    </Head>

    <MeapFloat theme={theme} />

    {/* 🌙☀️ Theme Toggle Button */}
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`fixed top-6 right-6 z-50 ${theme === "dark" ? "bg-white/10 hover:bg-white/20" : "bg-black/40 hover:bg-black/60"} py-2  text-white dark:text-black backdrop-blur-md px-3 rounded-full transition-all`}
    >
      <span
        className="inline-block transition-transform duration-500 ease-in-out"
        style={{ transform: theme === "dark" ? "rotate(0deg)" : "rotate(180deg)" }}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
    </button>
      <Navbar theme={theme} />

      {/* Searchbar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="relative p-[2px] rounded-full overflow-hidden gradient-border">
          <div className={`relative  ${theme === "dark" ? "bg-gray-800/50 text-white" : "bg-gray-300/40 text-black"} backdrop-blur-md rounded-full px-4 py-2`}>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent  placeholder-gray-500 outline-none"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className={`relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden px-6 ${
          theme === 'dark' ? 'bg-black' : 'bg-white'
        }`}
      >
        {/* Blurred Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 opacity-20'
                : 'bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 opacity-20'
            }`}
          />
        </div>

        {/* Particle background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full animate-particle ${
                theme === 'dark' ? 'bg-white/30' : 'bg-black/20'
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${5 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Frost layer on scroll */}
       
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className={`text-6xl md:text-8xl font-extrabold mb-6 py-2 text-transparent bg-clip-text bg-gradient-to-r ${
              theme === 'dark'
                ? 'from-cyan-400 via-blue-400 to-purple-500'
                : 'from-purple-400 via-pink-400 to-rose-400'
            }`}
          >
            DejnyO
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className={`text-xl md:text-2xl max-w-2xl ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Crafting immersive websites and apps with music, motion, and creativity.
          </motion.p>
      </section>


      {/* About Section with Parallax DejnyO */}
      <section className={`relative py-32 overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
     

        {/* Giant floating background text */}
        <h2
          ref={dejnyoTextRef}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] md:text-[140px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${
            theme === 'dark'
              ? 'from-cyan-400 via-blue-500 to-purple-500'
              : 'from-purple-400 via-pink-400 to-rose-400'
          } select-none whitespace-nowrap pointer-events-none opacity-20`}
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
            <h3 className={`text-4xl font-bold mb-6 lg:w-2/3 xl:w-1/2 text-transparent bg-clip-text bg-gradient-to-r ${
              theme === 'dark'
                ? 'from-cyan-400 via-blue-400 to-purple-400'
                : 'from-purple-400 via-pink-400 to-rose-400'
            }`}>
              Who We Are
            </h3>
            
            <p className={`text-lg leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              DejnyO is a digital agency blending code with creativity. We specialize in web and app development with a unique edge — most of our projects are rooted in music. Graphic design is a core part of our identity — we believe visuals should move with the rhythm.
            </p>
          </motion.div>
        </div>
      </section>

  <section ref={containerRef} id="about" className={`relative py-36 overflow-hidden ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
  <div className="max-w-7xl mx-auto md:px-8 flex flex-col items-center gap-12 relative">
    
    {/* Updated Title */}
    <h2 className={`text-6xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r ${
      theme === 'dark'
        ? 'from-cyan-400 via-blue-500 to-purple-500'
        : 'from-purple-400 via-pink-400 to-rose-400'
    }`}>
      What We Create
    </h2>
    {/* Desktop Layout */}
    <div className="relative w-full h-[400px] hidden md:block">
      {services.map((service, index) => (
        <div
          key={index}
          ref={setCardRef(index)}
          className={`absolute group rounded-3xl p-8 w-80 shadow-md hover:scale-105 hover:rotate-0 transition-all duration-500 border ${
            theme === 'dark'
              ? 'bg-gradient-to-tr from-gray-900/70 via-gray-800/70 to-gray-600/50 border-gray-700 hover:border-cyan-400'
              : 'bg-gradient-to-tr from-gray-300 via-white to-white border-gray-200 hover:border-pink-400'
          }`}
          style={{
            top: index === 0 ? '50px' : index === 1 ? '100px' : '200px',
            left: index === 0 ? '10%' : index === 1 ? '70%' : '40%',
          }}
        >
          <div className="text-5xl mb-4">{service.icon}</div>
          <h3 className={`text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${
            theme === 'dark'
              ? 'from-cyan-300 via-blue-400 to-purple-400'
              : 'from-purple-400 via-pink-400 to-rose-400'
          } group-hover:-translate-y-1 transition-transform duration-300`}>
            {service.title}
          </h3>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {service.description}
          </p>
        </div>
      ))}
    </div>

    {/* Mobile Layout */}
    <div className="grid grid-cols-1 gap-8 md:hidden">
      {services.map((service, index) => (
        <div
          key={index}
          className={`group rounded-3xl p-8 w-full shadow-md hover:scale-105 transition-all duration-500 border ${
            theme === 'dark'
              ? 'bg-gradient-to-br from-gray-800/70 via-gray-700/70 to-gray-600/50 border-gray-700 hover:border-cyan-400'
              : 'bg-gradient-to-br from-gray-100 via-white to-gray-50 border-gray-200 hover:border-pink-400'
          }`}
        >
          <div className="text-5xl mb-4">{service.icon}</div>
          <h3 className={`text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${
            theme === 'dark'
              ? 'from-cyan-300 via-blue-400 to-purple-400'
              : 'from-purple-400 via-pink-400 to-rose-400'
          } group-hover:-translate-y-1 transition-transform duration-300`}>
            {service.title}
          </h3>
          <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {service.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Offer Section - Updated Pricing Models */}
<section id="offer" className={`py-24 px-6 w-full text-center ${
  theme === 'dark' ? 'bg-black' : 'bg-white'
}`}>
  <h2 className={`text-5xl font-bold mb-16 lg:w-1/2 mx-auto text-transparent bg-clip-text bg-gradient-to-r ${
    theme === 'dark'
      ? 'from-cyan-400 via-blue-500 to-purple-500'
      : 'from-purple-400 via-pink-400 to-rose-400'
  }`}>
    Need a Website?
  </h2>

  <div className="grid md:grid-cols-3 gap-10 items-start">
    
    {/* Basic Plan */}
    <div className={`p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500 flex flex-col justify-between ${
      theme === 'dark'
        ? 'bg-white/5'
        : 'bg-gray-100'
    }`}>
      <div>
        <h3 className={`text-2xl font-bold mb-2 ${
          theme === 'dark' ? 'text-cyan-400' : 'text-pink-500'
        }`}>
          Basic
        </h3>
        <p className={`text-3xl font-extrabold mb-1 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          $10<span className="text-lg font-normal">/month</span>
        </p>
        <p className={`mb-6 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Starter package. Hosting, domain, security, and lifetime updates for different events and occasions.
        </p>
      </div>
      <a
        href="mailto:contact@dejnyo.com"
        className={`mt-6 inline-block font-bold py-2 px-6 rounded-full transition bg-gradient-to-r ${
    theme === 'dark' 
      ? 'from-cyan-400 via-blue-400 to-purple-400 text-white' 
      : 'from-pink-400 via-pink-500 to-rose-400 text-white'
  } hover:scale-110`}
      >
        Subscribe
      </a>
    </div>

    {/* Pro Plan (Highlighted) */}
    <div className={`p-10 rounded-3xl shadow-2xl hover:scale-110 transition-all duration-500 flex flex-col justify-between transform md:-translate-y-6 border-2 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-blue-600/60 via-cyan-500/50 to-blue-700/50 border-cyan-400'
        : 'bg-gradient-to-br from-pink-400 via-purple-400 to-rose-400 border-pink-400'
    }`}>
      <div>
        <h3 className="text-3xl font-bold text-white mb-2">Pro</h3>
        <p className="text-4xl font-extrabold text-white mb-1">$99</p>
        <p className="text-white/80 mb-6">
          One-time payment. Professional custom site with SEO, unique animations, and branding polish.
        </p>
      </div>
      <a
        href="mailto:contact@dejnyo.com"
        className="mt-6 inline-block hover:scale-110 bg-white hover:bg-gray-200 text-black font-bold py-2 px-6 rounded-full transition"
      >
        Get a Quote
      </a>
    </div>

    {/* Elite Plan */}
    <div className={`p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500 flex flex-col justify-between ${
      theme === 'dark'
        ? 'bg-white/5'
        : 'bg-gray-100'
    }`}>
      <div>
        <h3 className={`text-2xl font-bold mb-2 ${
          theme === 'dark' ? 'text-cyan-300' : 'text-pink-400'
        }`}>
          Elite
        </h3>
        <p className={`text-3xl font-extrabold mb-1 ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          $199
        </p>
        <p className={`mb-6 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Full custom solution. Web apps, e-commerce, interactive design — tailor-made to your needs.
        </p>
      </div>
      <a
        href="mailto:contact@dejnyo.com"
        className={`mt-6 inline-block font-bold py-2 px-6 rounded-full transition bg-gradient-to-r ${
    theme === 'dark' 
      ? 'from-cyan-400 via-blue-400 to-purple-400 text-white' 
      : 'from-pink-400 via-pink-500 to-rose-400 text-white'
  } hover:scale-110` }
      >
        Get a Quote
      </a>
    </div>
  </div>
</section>

{/* Our Team Section */}
<section id="team" className={`py-32 px-6 w-full text-center ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
  <h2 className={`text-5xl font-bold mb-16 text-transparent lg:w-1/4 mx-auto bg-clip-text bg-gradient-to-r ${
    theme === 'dark' 
      ? 'from-cyan-400 via-blue-500 to-purple-500' 
      : 'from-pink-400 via-pink-500 to-rose-400'
  }`}>
    Our Team
  </h2>

  <div className="grid md:grid-cols-2 gap-10">
    {/* Team Member 1 */}
    <FlipCard
      name="Dejny"
      role="Founder & Developer"
      image="/dejny.png"
      theme={theme}
    />

    {/* Team Member 2 */}
    <FlipCard
      name="Oskar"
      role="Creative Partner"
      image="/oskar.png"
      theme={theme}
    />
  </div>
</section>

<section className="relative">
  <div className="h-screen">
  <div className="absolute right-0 opacity-100  pointer-events-none">
  <img
    src="/meap/sidemeapblack.png"
    alt="Creepy Meap"
    className="h-[80vh] object-contain"
  />
</div>

<div className="absolute left-0 opacity-100  pointer-events-none">
  <img
    src="/meap/mrsmeapgray.png"
    alt="Creepy Meap"
    className="h-[80vh] object-contain"
  />
</div>
<div className=" text-center m-auto">
<h2 className={`text-5xl font-bold text-transparent lg:w-1/4 mx-auto bg-clip-text bg-gradient-to-r ${
    theme === 'dark' 
      ? 'from-cyan-400 via-blue-500 to-purple-500' 
      : 'from-pink-400 via-pink-500 to-rose-400'
  }`}>
    Meaps
  </h2>
  
</div>
<div className="absolute top-1/2 left-0 w-full z-0">
  <div className="w-full border-t border-dotted border-white/30"></div>
</div>

  </div>

</section>


{/* Our Work Section */}
<section className={`py-32  px-6 relative w-full text-center ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
  {/* Section Title */}
  <h2 className={`text-5xl font-bold mb-16 lg:w-1/4 mx-auto text-transparent bg-clip-text bg-gradient-to-r 
    ${theme === 'dark' ? 
    'from-cyan-400 via-blue-500 to-purple-500' :
     'from-purple-400 via-pink-400 to-rose-400'
     }`}>
    Our Work
  </h2>
 

  {/* Projects Grid */}
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
      // 🔥 Add more projects here
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
          className={`group block rounded-2xl p-10 text-left transition-transform duration-300 hover:-translate-y-3
          ${isLastOdd ? "md:col-span-2 md:w-1/2 md:mx-auto" : ""}
          ${theme === 'dark'
            ? 'bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/60 border border-gray-700 hover:border-cyan-400'
            : 'bg-gradient-to-br from-gray-100 via-gray-50 to-white border border-gray-300 hover:border-pink-400'
          }`}
        >
          <h3 className={`text-2xl font-bold mb-3 group-hover:-translate-y-1 transition-transform duration-300
            ${theme === 'dark'
             ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500'
          : ' text-transparent bg-clip-text bg-gradient-to-r  from-purple-400 via-pink-400 to-rose-400'
            }`}>
            {project.title}
          </h3>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {project.description}
          </p>
        </motion.a>
      );
    })}
  </div>
</section>

{/* Contact Section */}
<section id="contact" className={`py-36 px-6 mx-auto text-center relative overflow-hidden ${
  theme === 'dark' ? 'bg-black' : 'bg-white'
}`}>
  {/* Background Gradient */}
  <div className="absolute inset-0 pointer-events-none">
    <div className={`w-full h-full bg-gradient-to-b ${
      theme === 'dark'
        ? 'from-transparent via-transparent to-blue-900/60'
        : 'from-transparent via-transparent to-pink-300/80'
    }`} />
  </div>

  {/* Contact Title */}
  <h2 className={`text-5xl md:text-6xl font-extrabold mb-8 py-2 text-transparent bg-clip-text bg-gradient-to-r ${
    theme === 'dark'
     ? 'bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600'
          : 'bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400'
  }`}>
    Let&apos;s Create Together
  </h2>

  {/* Contact Text */}
  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-lg md:text-xl max-w-2xl mx-auto mb-12`}>
    Your ideas deserve more! Let&apos;s build something unforgettable — coded, crafted, and customized by DejnyO.
  </p>

  {/* Contact Button */}
  <a
    href="mailto:contact@dejnyo.com"
    className={`inline-block font-bold py-4 px-10 rounded-full shadow-xl hover:scale-105 transition-transform duration-300
      ${theme === 'dark'
       ? 'bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600'
          : 'bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400'
    }`}
  >
    contact@dejnyo.com
  </a>
</section>
{/* Footer */}
<footer className={`py-4 text-center bg-gradient-to-b pt-5 text-sm relative overflow-hidden ${
  theme === 'dark' ? 'bg-black text-gray-500 from-blue-600/50 to-black' : 'bg-white text-gray-700  from-pink-400/50 to-white '
}`}>
  {/* Divider Line */}
  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-11/12 h-px bg-gradient-to-r from-transparent  to-transparent ${
  theme === 'dark' ? ' via-blue-700' : ' via-pink-700'
}`} />

  {/* Footer Text */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
    className="relative z-10"
  >
    <p className={`text-transparent bg-clip-text bg-gradient-to-r ${
    theme === 'dark' 
      ? 'from-cyan-400 via-blue-400 to-purple-400' 
      : ' from-pink-400 via-pink-500 to-rose-400'
  } mb-1`}>
      © {new Date().getFullYear()} DejnyO
    </p>
  </motion.div>
</footer>

</div>
  )}