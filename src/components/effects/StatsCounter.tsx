import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  color: string;
  delay: number;
}

function AnimatedStat({ value, suffix, label, color, delay }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
    }, delay);
    return () => clearTimeout(timer);
  }, [inView, value, delay]);

  return (
    <motion.div
      ref={ref}
      className="text-center cyber-glass p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
    >
      <div className="font-cyber text-3xl md:text-4xl mb-1" style={{ color }}>
        {count}
        <span className="text-lg">{suffix}</span>
      </div>
      <div className="font-code text-xs text-cyber-blue-dim uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

const stats = [
  { value: 20, suffix: '+', label: 'Projects', color: '#00FFFF' },
  { value: 3, suffix: '', label: 'Internships ', color: '#FF0099' },
  { value: 3, suffix: '', label: 'Research Papers', color: '#8A2BE2' },
  { value: 500 , suffix: '+', label: 'Contributions', color: '#00FF41' },
];

export default function StatsCounter() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <AnimatedStat key={stat.label} {...stat} delay={i * 200} />
          ))}
        </div>
      </div>
    </div>
  );
}
