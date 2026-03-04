import { useRef, useEffect, useCallback } from 'react';

interface MatrixRainProps {
  opacity?: number;
}

export default function MatrixRain({ opacity = 0.15 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1).map(() => Math.random() * -100);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    function animate() {
      ctx!.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx!.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx!.font = `${fontSize}px 'Fira Code', monospace`;
      ctx!.shadowColor = '#00FF41';
      ctx!.shadowBlur = 3;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const brightness = Math.random();
        if (brightness > 0.7) {
          ctx!.fillStyle = '#FFFFFF';
        } else if (brightness > 0.3) {
          ctx!.fillStyle = '#00FF41';
        } else {
          ctx!.fillStyle = '#006622';
        }

        ctx!.fillText(char, x, y);

        if (y > canvasHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5 + Math.random() * 0.5;
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();
  }, []);

  useEffect(() => {
    draw();
    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity, zIndex: 1 }}
    />
  );
}
