'use client';
import { useEffect, useRef, useState } from 'react';

type Zone = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

interface MeapPos {
  x: number;
  y: number;
  zone: Zone;
}

export default function SmartTiltMeap({ theme }: { theme: 'dark' | 'light' }) {
  const [pos, setPos] = useState<MeapPos>({ x: 0, y: 0, zone: 'bottom-left' });
  const [angle, setAngle] = useState(-25);
  const meapRef = useRef<HTMLDivElement>(null);

  const getPositions = (): MeapPos[] => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const size = 96;

    return [
      { x: 0, y: 40, zone: 'top-left' },
      { x: w - size, y: 40, zone: 'top-right' },
      { x: 0, y: h - size -40, zone: 'bottom-left' },
      { x: w - size, y: h - size -40, zone: 'bottom-right' },
      { x: w / 2 - size / 2, y: h / 2 - size / 2, zone: 'center' },
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
      case 'center':
        return 0;
      default:
        return 0;
    }
  };

  useEffect(() => {
    const update = () => {
      const options = getPositions();
      const next = options[Math.floor(Math.random() * options.length)];
      const rot = getRotationForZone(next.zone);

      setAngle(rot);
      setPos(next);
    };

    update(); // initial
    const interval = setInterval(update, 4000);
    window.addEventListener('resize', update);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      ref={meapRef}
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: '6rem',
        height: '6rem',
        zIndex: 50,
        pointerEvents: 'none',
        userSelect: 'none',
        transition: 'all 1.2s ease-in-out',
        transform: `rotate(${angle}deg)`,
      }}
    >
      <img
        src={theme === 'dark' ? '/meap/nobgblink.png' : '/meap/idlemeap.png'}       
         alt="Meap"
        className="w-full h-full object-contain animate-float"
      />
    </div>
  );
}
