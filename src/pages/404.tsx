import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/NavBar";

export default function Custom404() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

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
    document.body.style.backgroundColor =
      theme === "dark" ? "#000000" : "#ffffff";
  }, [theme]);

  return (
    <div
      className={`transition-colors duration-500 ${
        theme === "dark" ? "text-white" : "text-black"
      } font-sans`}
    >
      <Head>
        <title>404 - Page Not Found | DejnyO</title>
        <meta
          name="description"
          content="Oops! The page you're looking for doesn't exist. Let's get you back on track with DejnyO."
        />
      </Head>

      {/* 🌙☀️ Theme Toggle Button */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`fixed top-6 right-6 z-50 ${
          theme === "dark"
            ? "bg-white/10 hover:bg-white/20"
            : "bg-black/40 hover:bg-black/60"
        } py-2 text-white dark:text-black backdrop-blur-md px-3 rounded-full transition-all`}
      >
        <span
          className="inline-block transition-transform duration-500 ease-in-out"
          style={{
            transform: theme === "dark" ? "rotate(0deg)" : "rotate(180deg)",
          }}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </span>
      </button>

      <Navbar theme={theme} />

      {/* 404 Hero Section */}
      <section
        className={`relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden px-6 ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        {/* Blurred Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 ${
              theme === "dark"
                ? "bg-gradient-to-br from-blue-500 via-indigo-400 to-purple-600 opacity-20"
                : "bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 opacity-20"
            }`}
          />
        </div>

        {/* Particle background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full animate-particle ${
                theme === "dark" ? "bg-white/30" : "bg-black/20"
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

        {/* 404 Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative z-10"
        >
          {/* 404 Number */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className={`text-8xl md:text-9xl font-extrabold mb-6 py-2 text-transparent bg-clip-text bg-gradient-to-r ${
              theme === "dark"
                ? "from-blue-400 via-indigo-400 to-purple-500"
                : "from-red-500 via-pink-500 to-orange-500"
            }`}
          >
            404
          </motion.h1>

          {/* Error Message */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-800"
            }`}
          >
            Oops! Page Not Found
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className={`text-lg md:text-xl max-w-2xl mb-8 mx-auto text-center ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            The page you&apos;re looking for seems to have wandered off into the
            digital void. Don&apos;t worry, even the best developers get lost
            sometimes!
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Go Home Button */}
            <Link
              href="/"
              className={`inline-block font-bold py-4 px-8 rounded-full shadow-xl hover:scale-105 transition-transform duration-300 bg-gradient-to-r ${
                theme === "dark"
                  ? "from-cyan-400 via-blue-400 to-purple-400 text-white"
                  : "from-purple-400 via-pink-400 to-rose-400 text-white"
              }`}
            >
              Take Me Home
            </Link>
          </motion.div>

          {/* Fun Facts Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className={`mt-16 p-6 rounded-2xl ${
              theme === "dark"
                ? "bg-white/5 border border-gray-700"
                : "bg-gray-100 border border-gray-200"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 ${
                theme === "dark" ? "text-cyan-400" : "text-pink-500"
              }`}
            >
              💡 Fun Fact
            </h3>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              The first 404 error was recorded in 1992 at CERN. The room where
              the web&apos;s central database was located was called &quot;Room
              404&quot; - hence the error code! Even the internet has its own
              origin stories.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className={`py-4 text-center bg-gradient-to-b pt-5 text-sm relative overflow-hidden ${
          theme === "dark"
            ? "bg-black text-gray-500 from-blue-600/50 to-black"
            : "bg-white text-gray-700 from-pink-400/50 to-white"
        }`}
      >
        {/* Divider Line */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-11/12 h-px bg-gradient-to-r from-transparent to-transparent ${
            theme === "dark" ? "via-blue-700" : "via-pink-700"
          }`}
        />

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <p
            className={`text-transparent bg-clip-text bg-gradient-to-r ${
              theme === "dark"
                ? "from-cyan-400 via-blue-400 to-purple-400"
                : "from-pink-400 via-pink-500 to-rose-400"
            } mb-1`}
          >
            © {new Date().getFullYear()} DejnyO - Making the www a better place
          </p>
        </motion.div>
      </footer>

      <style jsx>{`
        @keyframes particle {
          0% {
            transform: translateY(0px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-particle {
          animation: particle linear infinite;
        }
      `}</style>
    </div>
  );
}
