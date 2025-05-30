'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';


type Zone = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface MeapPos {
  x: number;
  y: number;
  zone: Zone;
}

export default function SmartTiltMeap({ theme }: { theme: 'dark' | 'light' }) {
  const [pos, setPos] = useState<MeapPos>({ x: 0, y: 0, zone: 'bottom-left' });
  const [angle, setAngle] = useState(-25);
  const [hovering, setHovering] = useState(false);
  const meapRef = useRef<HTMLDivElement>(null);

  const getPositions = (): MeapPos[] => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const size = 96;

    return [
      { x: 0, y: 40, zone: 'top-left' },
      { x: w - size, y: 40, zone: 'top-right' },
      { x: 0, y: h - size-40, zone: 'bottom-left' },
      { x: w - size, y: h - size-40, zone: 'bottom-right' },
    ];
  };

  const getRotationForZone = (zone: Zone): number => {
    switch (zone) {
      case 'top-left':
        return 45;
      case 'top-right':
        return -45;
      case 'bottom-left':
        return 25;
      case 'bottom-right':
        return -25;
      default:
        return 0;
    }
  };
  const getTooltipPosition = (zone: Zone) => {
    switch (zone) {
      case 'top-left':
        return 'top-full left-full';
      case 'top-right':
        return 'top-full right-full';
      case 'bottom-left':
        return 'bottom-full left-full';
      case 'bottom-right':
        return 'bottom-full right-full';
      default:
        return 'top-full left-1/2 -translate-x-1/2';
    }
  };
  
  useEffect(() => {
    const update = () => {
      const options = getPositions();
      const next = options[Math.floor(Math.random() * options.length)];
      const rot = getRotationForZone(next.zone);

      setPos(next);
      setAngle(rot);
    };

    update();
    const interval = setInterval(update, 4000);
    window.addEventListener('resize', update);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
    style={{
      position: 'fixed',
      left: pos.x,
      top: pos.y,
      width: '6rem',
      height: '6rem',
      zIndex: 50,
      pointerEvents: 'auto',
      userSelect: 'none',
      transition: 'all 1.2s ease-in-out',
      transform: `rotate(${angle}deg)`,
    }}
  >
    {/* Water-like tooltip (always upright and centered relative to Meap) */}
    {hovering && (
      <div
        className={`absolute ${getTooltipPosition(pos.zone)} px-3 py-1 text-sm rounded-full backdrop-blur-md ${
          theme === 'dark' ? 'text-black bg-white/80' : 'text-white bg-black/80'
        }`}
        style={{
          transform: 'rotate(0deg)',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}
      >
        Meap
      </div>
    )}
  
    {/* Meap inside a floating container */}
    <div
      ref={meapRef}
      className="w-full h-full relative animate-float"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Image
        src={theme === 'dark' ? '/meap/nobgblink.png' : '/meap/idlemeap.png'}
        alt="Meap"
        className="w-full h-full object-contain cursor-pointer"
        width={1000}
        height={1000}
      />
    </div>
  </div>
  );  
}
