import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootScreenProps {
  onComplete: () => void;
}

const asciiLogo = [
  '  ██████╗██╗   ██╗██████╗ ███████╗██████╗ ',
  ' ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗',
  ' ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝',
  ' ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗',
  ' ╚██████╗   ██║   ██████╔╝███████╗██║  ██║',
  '  ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝',
];

const bootLines = [
  { text: 'BIOS v4.2.0 — CyberCore Systems', delay: 200, color: 'text-cyber-blue-dim' },
  { text: 'Initializing neural interface...', delay: 500, color: 'text-cyber-blue-dim' },
  { text: 'Memory check: 64TB quantum RAM — OK', delay: 800, color: 'text-cyber-green' },
  { text: 'Loading encryption modules...', delay: 1100, color: 'text-cyber-blue-dim' },
  { text: 'Connecting to darknet nodes... [3/3]', delay: 1400, color: 'text-cyber-blue-dim' },
  { text: 'Firewall protocols: ACTIVE', delay: 1700, color: 'text-cyber-green' },
  { text: 'Identity mask: ENGAGED', delay: 2000, color: 'text-neon-pink' },
  { text: '> System ready. Welcome back, Operator.', delay: 2300, color: 'text-cyber-green' },
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Show ASCII logo after a brief delay
    setTimeout(() => setShowLogo(true), 100);

    bootLines.forEach((_, i) => {
      setTimeout(() => setVisibleLines(i + 1), bootLines[i].delay);
    });

    // Progress bar
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 1.5;
      });
    }, 30);

    // Complete
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 800);
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
        >
          {/* Scanlines on boot */}
          <div className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
            }}
          />

          <div className="max-w-2xl w-full px-4 md:px-6">
            {/* ASCII Logo */}
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  className="mb-6 text-center overflow-hidden"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <pre className="font-code text-[8px] sm:text-[10px] md:text-xs text-neon-pink leading-tight inline-block text-left"
                    style={{ textShadow: '0 0 10px rgba(255,0,153,0.5)' }}
                  >
                    {asciiLogo.join('\n')}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Terminal window */}
            <div className="cyber-glass-strong p-5 md:p-6">
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-900/30">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-3 text-[10px] text-cyber-blue-dim font-code tracking-wider">
                  system_boot.sh — cybercore@terminal
                </span>
              </div>

              {/* Boot lines */}
              <div className="font-code text-xs md:text-sm space-y-1.5 min-h-[200px]">
                {bootLines.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={line.color}
                  >
                    <span className="text-cyber-green/60 mr-2 select-none">
                      [{String(i + 1).padStart(2, '0')}]
                    </span>
                    {line.text}
                    {line.text.includes('OK') && (
                      <span className="text-cyber-green ml-2">✓</span>
                    )}
                    {line.text.includes('ACTIVE') && (
                      <span className="text-cyber-green ml-2">🛡️</span>
                    )}
                    {line.text.includes('ENGAGED') && (
                      <span className="text-neon-pink ml-2">🎭</span>
                    )}
                  </motion.div>
                ))}
                {visibleLines < bootLines.length && (
                  <span className="terminal-cursor" />
                )}
              </div>

              {/* Progress bar */}
              <div className="mt-5">
                <div className="flex justify-between text-[10px] text-cyber-blue-dim mb-1.5 font-code">
                  <span>Initializing Portfolio v2.0</span>
                  <span className="tabular-nums">{Math.min(Math.round(progress), 100)}%</span>
                </div>
                <div className="w-full bg-cyber-dark rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #00FFFF, #FF0099, #8A2BE2)',
                      boxShadow: '0 0 8px rgba(0,255,255,0.5)',
                    }}
                    transition={{ duration: 0.05 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
