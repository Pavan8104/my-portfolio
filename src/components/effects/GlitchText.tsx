import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const glitchChars = '!@#$%^&*<>[]{}|/\\~`';

export default function GlitchText({ text, className = '', intensity = 'medium' }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const interval = useMemo(() => {
    switch (intensity) {
      case 'low': return 5000;
      case 'medium': return 3000;
      case 'high': return 1500;
    }
  }, [intensity]);

  const doGlitch = useCallback(() => {
    setIsGlitching(true);
    const glitchSteps = 6;
    let step = 0;

    const glitchInterval = setInterval(() => {
      if (step >= glitchSteps) {
        setDisplayText(text);
        setIsGlitching(false);
        clearInterval(glitchInterval);
        return;
      }

      const chars = text.split('');
      const numGlitch = Math.floor(chars.length * (0.1 + Math.random() * 0.2));
      for (let i = 0; i < numGlitch; i++) {
        const idx = Math.floor(Math.random() * chars.length);
        if (chars[idx] !== ' ') {
          chars[idx] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        }
      }
      setDisplayText(chars.join(''));
      step++;
    }, 50);
  }, [text]);

  useEffect(() => {
    const timer = setInterval(doGlitch, interval);
    return () => clearInterval(timer);
  }, [doGlitch, interval]);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={isGlitching ? {
        x: [0, -2, 2, -1, 0],
        opacity: [1, 0.8, 1, 0.9, 1],
      } : {}}
      transition={{ duration: 0.3 }}
    >
      {displayText}
      {isGlitching && (
        <>
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              color: '#00FFFF',
              clipPath: `inset(${Math.random() * 40}% 0 ${Math.random() * 40}% 0)`,
              transform: 'translateX(-2px)',
              opacity: 0.7,
            }}
          >
            {displayText}
          </span>
          <span
            className="absolute inset-0 pointer-events-none"
            style={{
              color: '#FF0099',
              clipPath: `inset(${Math.random() * 40}% 0 ${Math.random() * 40}% 0)`,
              transform: 'translateX(2px)',
              opacity: 0.7,
            }}
          >
            {displayText}
          </span>
        </>
      )}
    </motion.span>
  );
}
