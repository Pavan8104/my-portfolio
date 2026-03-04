import { useState, useEffect, useCallback } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
}

export default function TypingEffect({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  className = '',
  showCursor = true,
}: TypingEffectProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const tick = useCallback(() => {
    setDisplayed((prev) => {
      if (prev.length >= text.length) {
        setDone(true);
        return prev;
      }
      return text.slice(0, prev.length + 1);
    });
  }, [text]);

  useEffect(() => {
    if (!started || done) return;
    const timer = setInterval(tick, speed);
    return () => clearInterval(timer);
  }, [started, done, tick, speed]);

  useEffect(() => {
    if (done && onComplete) {
      const t = setTimeout(onComplete, 200);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  if (!started) return null;

  return (
    <span className={className}>
      {displayed}
      {showCursor && !done && <span className="terminal-cursor" />}
    </span>
  );
}
