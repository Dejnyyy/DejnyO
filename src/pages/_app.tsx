import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState("dark"); // Default dark mode

  useEffect(() => {
    document.documentElement.className = theme; // Add "dark" or "light" class to <html>
  }, [theme]);

  return (
    <>
      <Head>
        <title>DejnyO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Theme Toggle Button */}
      <button
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  className="fixed top-6 right-6 z-50 bg-white/10 hover:bg-white/20 text-white dark:text-black backdrop-blur-md p-3 rounded-full transition-all"
>
  <span
    className="inline-block transition-transform duration-500 ease-in-out"
    style={{ transform: theme === "dark" ? "rotate(0deg)" : "rotate(180deg)" }}
  >
    {theme === "dark" ? "🌙" : "☀️"}
  </span>
</button>


      {/* Actual website */}
      <Component {...pageProps} />
    </>
  );
}
