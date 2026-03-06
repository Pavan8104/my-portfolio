import { useRef, useState, useEffect } from 'react';

interface VirtualJoystickProps {
  /**
   * Normalized movement vector where x/y are in range [-1, 1]
   * x: left (-1) to right (1)
   * y: up (-1) to down (1)
   */
  onMove: (vector: { x: number; y: number }) => void;
  onEnd?: () => void;
  className?: string;
}

export default function VirtualJoystick({
  onMove,
  onEnd,
  className = '',
}: VirtualJoystickProps) {
  const baseRef = useRef<HTMLDivElement>(null);
  const [thumbPos, setThumbPos] = useState({ x: 0, y: 0 });
  const activePointerId = useRef<number | null>(null);

  const maxRadius = 40; // px, thumb travel from center

  const reset = () => {
    setThumbPos({ x: 0, y: 0 });
    onMove({ x: 0, y: 0 });
    onEnd?.();
  };

  const getVectorFromEvent = (clientX: number, clientY: number) => {
    const base = baseRef.current;
    if (!base) return { x: 0, y: 0 };

    const rect = base.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy) || 1;
    const clampedDist = Math.min(distance, maxRadius);
    const scale = clampedDist / distance;

    const clampedX = dx * scale;
    const clampedY = dy * scale;

    // Normalize to [-1, 1]
    const normX = clampedX / maxRadius;
    const normY = clampedY / maxRadius;

    return {
      thumb: { x: clampedX, y: clampedY },
      vector: { x: normX, y: normY },
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only capture primary pointer
    if (activePointerId.current !== null && activePointerId.current !== e.pointerId) {
      return;
    }

    activePointerId.current = e.pointerId;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const { thumb, vector } = getVectorFromEvent(e.clientX, e.clientY);
    setThumbPos(thumb);
    onMove(vector);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== e.pointerId) return;

    const { thumb, vector } = getVectorFromEvent(e.clientX, e.clientY);
    setThumbPos(thumb);
    onMove(vector);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== e.pointerId) return;
    activePointerId.current = null;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    reset();
  };

  // Safety: reset if component unmounts while pressed
  useEffect(() => {
    return () => {
      activePointerId.current = null;
    };
  }, []);

  return (
    <div
      ref={baseRef}
      className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-black/40 border border-cyber-blue/40 shadow-[0_0_16px_rgba(0,255,255,0.35)] backdrop-blur-sm touch-none select-none ${className}`}
      style={{ touchAction: 'none' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Outer markings */}
      <div className="absolute inset-1 rounded-full border border-cyber-blue/20 pointer-events-none" />
      <div className="absolute inset-3 rounded-full border border-cyber-blue/10 pointer-events-none" />

      {/* Direction ticks */}
      <div className="absolute top-1/2 left-1 -translate-y-1/2 w-1 h-3 bg-cyber-blue/50 rounded-sm pointer-events-none" />
      <div className="absolute top-1/2 right-1 -translate-y-1/2 w-1 h-3 bg-cyber-blue/50 rounded-sm pointer-events-none" />
      <div className="absolute left-1/2 top-1 -translate-x-1/2 w-3 h-1 bg-neon-pink/70 rounded-sm pointer-events-none" />
      <div className="absolute left-1/2 bottom-1 -translate-x-1/2 w-3 h-1 bg-cyber-blue/50 rounded-sm pointer-events-none" />

      {/* Thumb */}
      <div
        className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-neon-pink to-cyber-blue shadow-[0_0_20px_rgba(255,0,153,0.7)] border border-white/40 flex items-center justify-center pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(calc(-50% + ${thumbPos.x}px), calc(-50% + ${thumbPos.y}px))`,
        }}
      >
        <span className="font-code text-[9px] text-black/80">NAV</span>
      </div>
    </div>
  );
}


