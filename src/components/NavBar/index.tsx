'use client';
import React from 'react';
import { Home, Laptop, DollarSign, Users, Mail } from 'lucide-react';

export default function Navbar({ theme }: { theme: 'dark' | 'light' }) {
  const gradient = theme === 'dark'
    ? 'from-cyan-400 via-blue-500 to-indigo-500'
    : 'from-purple-400 via-pink-400 to-rose-400';

  const bg = theme === 'dark'
    ? 'bg-gray-800/50 text-white'
    : 'bg-gray-300/40 text-white';

  return (
    <>
      {/* Desktop Nav (left top) */}
      <div className="hidden lg:block fixed top-4 left-6 z-50 w-auto">
        <div className={`relative p-[1px] rounded-full overflow-hidden bg-gradient-to-br ${gradient}`}>
        <div className={`relative backdrop-blur-md rounded-full px-4 py-2 flex justify-center gap-6 ${bg}`}>
       {/* Home */}
            <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:scale-110 transition-transform cursor-pointer"
            title="Home"
            >
            <Home size={24} />
            </button>

            {/* What We Create */}
            <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:scale-110 transition-transform cursor-pointer"
            title="What We Create"
            >
            <Laptop size={24} />
            </button>

            {/* Our Offer */}
            <button
            onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:scale-110 transition-transform cursor-pointer"
            title="Our Offer"
            >
            <DollarSign size={24} />
            </button>

            {/* Our Team */}
            <button
            onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:scale-110 transition-transform cursor-pointer"
            title="Our Team"
            >
            <Users size={24} />
            </button>

            {/* Contact */}
            <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:scale-110 transition-transform cursor-pointer"
            title="Contact"
            >
            <Mail size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav (bottom center) */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-xs">
        <div className={`relative p-[1px] rounded-full overflow-hidden bg-gradient-to-br ${gradient}`}>
          <div className={`relative backdrop-blur-md rounded-full px-4 py-2 flex justify-between ${bg}`}>
            {/* Home */}
            <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:scale-110 transition-transform cursor-pointer"
            title="Home"
            >
            <Home size={22} />
            </button>

            {/* What We Create */}
            <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:scale-110 transition-transform cursor-pointer"
            title="What We Create"
            >
            <Laptop size={22} />
            </button>

            {/* Our Offer */}
            <button
            onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:scale-110 transition-transform cursor-pointer"
            title="Our Offer"
            >
            <DollarSign size={22} />
            </button>

            {/* Our Team */}
            <button
            onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:scale-110 transition-transform cursor-pointer"
            title="Our Team"
            >
            <Users size={22} />
            </button>

            {/* Contact */}
            <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="hover:scale-110 transition-transform cursor-pointer"
            title="Contact"
            >
            <Mail size={22} />
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
