import { useState, useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { playSound } from '../../hooks/useAudio';

const HolographicShader = lazy(() => import('../effects/HolographicShader'));

interface HeroSectionProps {
  onHackClick: () => void;
}

export default function HeroSection({ onHackClick }: HeroSectionProps) {
  const [showButton, setShowButton] = useState(false);

  // Show button after 2s delay
  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Holographic shader layer */}
      <Suspense fallback={null}>
        <HolographicShader />
      </Suspense>

      {/* Subtle grid background */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30" />

      {/* Main content */}
      <div className="text-center z-20 px-4 max-w-4xl">
        {/* Subtitle */}
        <motion.p
          className="font-code text-sm md:text-base text-cyber-blue-dim mb-6 tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {'$ cat /dev/identity'}
        </motion.p>

        {/* Main glitchy title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <h1
            className="font-cyber text-2xl sm:text-3xl md:text-4xl lg:text-5xl neon-text-pink leading-tight text-left"
          >
            I don't design pixels.
            <br />
            I engineer the backbone.
          </h1>
          <p className="font-code text-cyber-blue-dim text-base md:text-lg mt-4 tracking-widest opacity-70 text-right">
            — Mayank Sharma
          </p>
        </motion.div>



        {/* Hack button */}
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
          >
            <button
              onClick={() => {
                playSound('crackle');
                onHackClick();
              }}
              onMouseEnter={() => playSound('hover')}
              className="cyber-button-pink text-base md:text-lg px-8 py-4 animate-glow-pulse"
              style={{
                boxShadow:
                  '0 0 15px rgba(255,0,153,0.4), 0 0 30px rgba(255,0,153,0.2), inset 0 0 15px rgba(255,0,153,0.1)',
              }}
            >
              <span className="mr-2">⚡</span>
              Hack into Mayank's Info
            </button>
          </motion.div>
        )}

        {/* Floating glitch particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                background: i % 2 === 0 ? '#00FFFF' : '#FF0099',
                boxShadow: `0 0 6px ${i % 2 === 0 ? '#00FFFF' : '#FF0099'}`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
