'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import Image from 'next/image';
import { MousePointerClick } from 'lucide-react';

export function FlipCard({
  name,
  role,
  image,
  theme,
}: {
  name: string;
  role: string;
  image: string;
  theme: 'dark' | 'light';
}) {
  const [flipped, setFlipped] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const frontClasses = clsx(
    'absolute inset-0 rounded-3xl p-6 flex flex-col justify-center items-center backface-hidden transition-transform',
    theme === 'dark'
      ? 'bg-black/40 text-white border border-cyan-400/30'
      : 'bg-white/30 text-black border border-pink-400/30'
  );

  const backClasses = clsx(
    'absolute inset-0 rounded-3xl p-4 flex flex-col justify-center items-center rotate-y-180 backface-hidden',
    theme === 'dark'
      ? ' border border-cyan-400/30'
      : 'border border-pink-400/30'
  );

  return (
    <div
    onClick={() => {
        setFlipped(!flipped);
        setShowHint(false);
      }}
            className="w-full h-96 cursor-pointer perspective"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Front */}
        <div className={frontClasses}>
        {!flipped || showHint && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.2 }}
                className={`absolute m-auto ${theme === "dark" ? "text-white":"text-black"}`}
            >
                <MousePointerClick size={40} />
            </motion.div>
            )}

        </div>

        {/* Back */}
        <div className={backClasses}>
          <Image
            src={image}
            alt={name}
            className="w-auto max-h-64 object-fit rounded-2xl hover:scale-110 transition-all duration-200"
            width={1000}
            height={1000}
          />
           <h3 className="text-2xl font-bold mb-2">{name}</h3>
           <p className="text-gray-400">{role}</p>
        </div>
      </motion.div>
    </div>
  );
}
