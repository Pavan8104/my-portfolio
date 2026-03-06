import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { playSound } from '../../hooks/useAudio';

interface MobileRotatorProps {
  onRotate: (direction: 1 | -1) => void;
  className?: string;
}

export default function MobileRotator({ onRotate, className = '' }: MobileRotatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const controls = useAnimation();

  // We need to keep track of the last angle to compute deltas
  const lastAngleRef = useRef<number | null>(null);
  // Accumulated rotation before triggering a slide change
  const accumulatedDeltaRef = useRef(0);
  const SENSITIVITY = 30; // Degrees required to trigger next/prev slide

  const getAngle = (x: number, y: number) => {
    if (!containerRef.current) return 0;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Calculate angle in degrees from the center point
    const dx = x - centerX;
    const dy = y - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    lastAngleRef.current = getAngle(clientX, clientY);
    controls.stop();
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || lastAngleRef.current === null) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const currentAngle = getAngle(clientX, clientY);
    
    // Calculate smallest valid delta (handling the -180 to 180 wrap around)
    let delta = currentAngle - lastAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    const newRotation = rotation + delta;
    setRotation(newRotation);
    
    // Accumulate the delta to trigger slide changes
    accumulatedDeltaRef.current += delta;
    
    if (Math.abs(accumulatedDeltaRef.current) >= SENSITIVITY) {
      const direction = accumulatedDeltaRef.current > 0 ? 1 : -1;
      onRotate(direction);
      playSound('click');
      accumulatedDeltaRef.current = 0; // Reset accumulation
    }

    lastAngleRef.current = currentAngle;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    lastAngleRef.current = null;
    accumulatedDeltaRef.current = 0;
  };

  // Prevent default scroll behavior when touching the dial
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    const blockTouchScroll = (e: TouchEvent) => {
      e.preventDefault();
    };
    
    el.addEventListener('touchmove', blockTouchScroll, { passive: false });
    return () => el.removeEventListener('touchmove', blockTouchScroll);
  }, []);

  return (
    <div 
      className={`relative w-40 h-40 flex items-center justify-center ${className} lg:hidden`}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
    >
      {/* Outer Dial Decoration */}
      <div className="absolute inset-0 rounded-full border border-cyber-blue/30 shadow-[0_0_15px_rgba(0,255,255,0.1)]" />
      
      {/* Inner Rotatable Dial */}
      <motion.div
        className="absolute inset-4 rounded-full border-2 border-cyber-pink/50 flex items-center justify-center bg-black/40 backdrop-blur-sm cursor-grab active:cursor-grabbing"
        style={{ rotate: rotation }}
        animate={controls}
      >
        {/* Indicators/Grips */}
        <div className="absolute top-1 w-2 h-2 rounded-full bg-cyber-pink shadow-[0_0_8px_rgba(255,0,128,0.8)]" />
        <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-cyber-blue/50" />
        <div className="absolute left-1 w-1.5 h-1.5 rounded-full bg-cyber-blue/50" />
        <div className="absolute right-1 w-1.5 h-1.5 rounded-full bg-cyber-blue/50" />
        
        {/* Center label */}
        <span className="font-code text-[10px] text-cyber-blue-dim opacity-70 rotate-0" 
              style={{ transform: `rotate(${-rotation}deg)` }}>
          NAV
        </span>
      </motion.div>
    </div>
  );
}
