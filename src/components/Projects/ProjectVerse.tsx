import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../../data/projects';
import { playSound } from '../../hooks/useAudio';

const SPACING = 12;
const TOTAL_DEPTH = (projects.length - 1) * SPACING;

/* ─── Speed Lines ─── */
function SpeedLines({ speed }: { speed: number }) {
  const ref = useRef<THREE.Points>(null);
  const count = 200;

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = Math.random() * -(TOTAL_DEPTH + 30);
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = Math.min(Math.abs(speed) * 8, 0.6);
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.04} color="#00FFFF" transparent opacity={0.3} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ─── Ambient Dust Particles ─── */
function DustParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 120;

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = Math.random() * -(TOTAL_DEPTH + 20);
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.06} color="#8A2BE2" transparent opacity={0.4} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ─── Neon Grid Floor ─── */
function NeonFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, -(TOTAL_DEPTH / 2)]}>
      <planeGeometry args={[30, TOTAL_DEPTH + 40, 30, Math.max(20, Math.round(TOTAL_DEPTH / 2))]} />
      <meshBasicMaterial color="#00FFFF" wireframe transparent opacity={0.04} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

/* ─── Project Poster Panel ─── */
function ProjectPanel({
  project,
  index,
  cameraZ,
  onSelect,
}: {
  project: (typeof projects)[0];
  index: number;
  cameraZ: number;
  onSelect: () => void;
}) {
  const z = -index * SPACING;
  const dist = Math.abs(cameraZ - z);
  const isClose = dist < 6;
  const xOffset = index % 2 === 0 ? -0.8 : 0.8;
  const yOffset = Math.sin(index * 1.2) * 0.5;
  const isFeatured = project.featured;

  return (
    <group position={[xOffset, yOffset, z]}>
      {/* Poster background plane */}
      <mesh>
        <planeGeometry args={[5.5, 3.5]} />
        <meshBasicMaterial
          color={isFeatured ? '#FF0099' : '#00FFFF'}
          transparent
          opacity={isClose ? 0.08 : 0.03}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Border frame */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(5.5, 3.5)]} />
        <lineBasicMaterial
          color={isFeatured ? '#FF0099' : '#00FFFF'}
          transparent
          opacity={isClose ? 0.7 : 0.2}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Corner accent lines */}
      {[[-2.75, 1.75], [2.75, 1.75], [-2.75, -1.75], [2.75, -1.75]].map(([cx, cy], ci) => (
        <mesh key={ci} position={[cx, cy, 0.01]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial
            color={isFeatured ? '#FF0099' : '#00FFFF'}
            transparent
            opacity={isClose ? 0.5 : 0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* HTML overlay for content */}
      <Html
        center
        distanceFactor={6}
        style={{
          width: '420px',
          opacity: isClose ? 1 : 0.15,
          transition: 'opacity 0.5s',
          pointerEvents: isClose ? 'auto' : 'none',
        }}
      >
        <div
          className="text-center select-none"
          style={{ transform: 'scale(1)' }}
        >
          {/* Project number */}
          <div className="font-code text-[10px] text-cyber-blue-dim/40 mb-1 tracking-widest">
            PROJECT {String(index + 1).padStart(2, '0')}
          </div>

          {/* Title */}
          <h3
            className={`font-cyber text-xl md:text-2xl uppercase tracking-widest mb-2 ${
              isFeatured ? 'text-neon-pink' : 'text-cyber-blue'
            }`}
            style={{
              textShadow: isFeatured
                ? '0 0 20px rgba(255,0,153,0.6)'
                : '0 0 20px rgba(0,255,255,0.6)',
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="font-code text-xs text-cyber-blue-dim/80 max-w-[320px] mx-auto mb-3 leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 text-[10px] font-code rounded border ${
                  isFeatured
                    ? 'bg-neon-pink/10 text-neon-pink border-neon-pink/30'
                    : 'bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          {isClose && (
            <div className="flex gap-3 justify-center">
              {project.github && (
                <button
                  className="cyber-button text-[10px] py-1.5 px-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    playSound('click');
                    window.open(project.github, '_blank');
                  }}
                >
                  {'<>'} Code
                </button>
              )}
              <button
                className="cyber-button-pink text-[10px] py-1.5 px-4"
                onClick={(e) => {
                  e.stopPropagation();
                  playSound('click');
                  onSelect();
                }}
              >
                ◈ Explore
              </button>
            </div>
          )}

          {/* Featured badge */}
          {isFeatured && (
            <div
              className="absolute -top-1 -right-12 bg-neon-pink text-black px-2 py-0.5 text-[9px] font-bold font-cyber uppercase tracking-wider"
              style={{ boxShadow: '0 0 10px rgba(255,0,153,0.4)' }}
            >
              ★ Featured
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

/* ─── Camera Controller ─── */
function CameraController({
  progress,
  onSpeedChange,
}: {
  progress: number;
  onSpeedChange: (s: number) => void;
}) {
  const { camera } = useThree();
  const prevZ = useRef(0);

  useFrame(() => {
    const START_OFFSET = 8;
    const targetZ = START_OFFSET - progress * (TOTAL_DEPTH + START_OFFSET);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);
    camera.position.x = Math.sin(progress * Math.PI * 2) * 0.3;
    camera.position.y = Math.cos(progress * Math.PI * 3) * 0.15;

    const speed = camera.position.z - prevZ.current;
    prevZ.current = camera.position.z;
    onSpeedChange(speed);
  });

  return null;
}

/* ─── Main ProjectVerse Component ─── */
export default function ProjectVerse({
  onComplete,
  onSelectProject,
}: {
  onComplete?: () => void;
  onSelectProject: (p: (typeof projects)[0]) => void;
}) {
  const [launched, setLaunched] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [verseInView, setVerseInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const activeIndex = Math.min(
    Math.round(Math.min(progress, 1) * (projects.length - 1)),
    projects.length - 1
  );

  // Detect when the verse canvas is visible and snap it into full view
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    // Detect partial visibility to trigger snap
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setVerseInView(visible);

        // Snap: if verse is partially visible (not fully), scroll it into full view
        if (visible && entry.intersectionRatio < 0.85 && progress > 0 && progress < 1.0) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      },
      { threshold: [0.1, 0.3, 0.5, 0.85] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [launched, progress]);

  // Lock body scroll when verse is in view and mid-progress
  useEffect(() => {
    if (!launched) return;
    const shouldLock = verseInView && progress > 0 && progress < 1.0;
    document.body.style.overflow = shouldLock ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [launched, verseInView, progress]);

  // Handle scroll within the verse
  useEffect(() => {
    if (!launched) return;

    const handleWheel = (e: WheelEvent) => {
      // Only capture scroll if the verse canvas is visible
      if (!verseInView) return;

      const delta = e.deltaY * 0.0004;

      setProgress((prev) => {
        const next = prev + delta;
        const clamped = Math.max(0, Math.min(1.05, next));

        // Mark complete once user passes the last project
        if (clamped >= 1.0 && !completed) {
          setCompleted(true);
          onComplete?.();
        }

        // At the end and scrolling forward → let page scroll take over
        if (clamped >= 1.0 && delta > 0) {
          return clamped;
        }

        // At the start and scrolling backward → let page scroll up
        if (clamped <= 0 && delta < 0) {
          return 0;
        }

        // Otherwise block page scroll and move the camera
        e.preventDefault();
        return clamped;
      });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [launched, verseInView, completed, onComplete]);

  const launch = () => {
    playSound('whoosh');
    setLaunched(true);
  };

  const navigateToProject = (index: number) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, index));
    const targetProgress = projects.length > 1 ? clamped / (projects.length - 1) : 0;
    playSound('click');
    setProgress(targetProgress);
    if (targetProgress >= 1.0 && !completed) {
      setCompleted(true);
      onComplete?.();
    }
  };

  return (
    <section id="projects" className="relative" ref={containerRef}>
      {/* Pre-launch screen */}
      <AnimatePresence>
        {!launched && (
          <motion.div
            className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 cyber-grid-bg opacity-15 pointer-events-none" />

            <motion.p
              className="relative z-10 font-code text-xs text-cyber-blue-dim tracking-widest uppercase mb-4"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {'// CLASSIFIED PROJECTS'}
            </motion.p>

            <motion.h2
              className="relative z-10 cyber-heading text-3xl md:text-5xl neon-text-pink mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Project Verse
            </motion.h2>

            <motion.p
              className="relative z-10 font-code text-cyber-blue-dim text-sm mb-10 text-center max-w-md px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Fly through the constellation of builds. Scroll to navigate.
            </motion.p>

            <motion.button
              className="relative z-10 cyber-button-pink px-8 py-4 text-base animate-glow-pulse"
              onClick={launch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              🚀 Launch into Project Verse
            </motion.button>

            {/* Skip link */}
            <motion.button
              className="relative z-10 mt-4 font-code text-[11px] text-cyber-blue-dim/50 hover:text-cyber-blue-dim transition-colors underline underline-offset-4"
              onClick={() => {
                const next = document.getElementById('experience');
                next?.scrollIntoView({ behavior: 'smooth' });
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              or skip to next section →
            </motion.button>

            {/* Floating indicators */}
            <motion.div
              className="relative z-10 mt-8 flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {projects.map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full border border-cyber-blue/30 bg-cyber-blue/10"
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Verse */}
      {launched && (
        <motion.div
          ref={canvasRef}
          className="h-screen w-full relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Canvas
            camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 200 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true }}
            style={{ background: '#050510' }}
          >
            <fog attach="fog" args={['#050510', 15, 60]} />
            <CameraController progress={progress} onSpeedChange={setSpeed} />
            <SpeedLines speed={speed} />
            <DustParticles />
            <NeonFloor />

            {projects.map((project, i) => (
              <ProjectPanel
                key={project.id}
                project={project}
                index={i}
                cameraZ={8 - progress * (TOTAL_DEPTH + 8)}
                onSelect={() => onSelectProject(project)}
              />
            ))}
          </Canvas>

          {/* HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none z-10">
            {/* Top bar */}
            <div className="absolute top-20 left-0 right-0 flex justify-center">
              <div className="flex items-center gap-3 cyber-glass px-4 py-2 rounded-full">
                {projects.map((p, i) => (
                  <div
                    key={p.id}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'bg-neon-pink scale-125 shadow-[0_0_8px_rgba(255,0,153,0.8)]'
                        : i < activeIndex
                        ? 'bg-cyber-blue/50'
                        : 'bg-cyber-blue/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Current project label — lifted on mobile so it clears the nav buttons */}
            <div className="absolute bottom-20 md:bottom-8 left-1/2 -translate-x-1/2">
              <div className="font-code text-xs text-cyber-blue-dim text-center">
                <span className="text-neon-pink font-cyber">
                  {projects[Math.min(activeIndex, projects.length - 1)]?.title}
                </span>
                <span className="ml-3 text-cyber-blue-dim/40">
                  {activeIndex + 1}/{projects.length}
                </span>
              </div>
            </div>

            {/* Scroll hint — desktop only */}
            {progress < 0.05 && (
              <motion.div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
                animate={{ opacity: [1, 0.3, 1], y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="font-code text-[10px] text-cyber-blue-dim tracking-widest uppercase">
                  Scroll to navigate
                </span>
                <div className="w-4 h-6 border border-cyber-blue/30 rounded-full flex items-start justify-center p-1">
                  <motion.div
                    className="w-1 h-1.5 bg-cyber-blue rounded-full"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            )}

            {/* Tap hint — mobile only, fades once user navigates */}
            {progress < 0.05 && (
              <motion.div
                className="absolute bottom-20 left-1/2 -translate-x-1/2 flex md:hidden flex-col items-center gap-1"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="font-code text-[10px] text-cyber-blue-dim tracking-widest uppercase">
                  Tap ◀ ▶ to navigate
                </span>
              </motion.div>
            )}
          </div>

        </motion.div>
      )}

      {/* Mobile PREV / NEXT — fixed to the viewport so scroll-snap / page movement
          never drags them off screen. Gated on verseInView so they vanish the
          moment the user scrolls past the project space into any other section. */}
      <AnimatePresence>
        {launched && verseInView && (
          <motion.div
            className="fixed bottom-4 left-0 right-0 flex items-center justify-between px-5 z-[200] md:hidden pointer-events-none"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <motion.button
              className="pointer-events-auto flex items-center gap-1.5 px-4 py-2.5 rounded font-code text-xs uppercase tracking-wider border transition-colors duration-200 select-none"
              style={{
                background: activeIndex === 0
                  ? 'rgba(0,255,255,0.04)'
                  : 'rgba(0,255,255,0.1)',
                borderColor: activeIndex === 0
                  ? 'rgba(0,255,255,0.15)'
                  : 'rgba(0,255,255,0.5)',
                color: activeIndex === 0
                  ? 'rgba(0,255,255,0.25)'
                  : '#00FFFF',
                boxShadow: activeIndex === 0
                  ? 'none'
                  : '0 0 12px rgba(0,255,255,0.25)',
              }}
              onClick={() => navigateToProject(activeIndex - 1)}
              disabled={activeIndex === 0}
              whileTap={activeIndex > 0 ? { scale: 0.93 } : {}}
            >
              ◀ Prev
            </motion.button>

            <div className="font-code text-[10px] text-cyber-blue-dim/50 tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>

            <motion.button
              className="pointer-events-auto flex items-center gap-1.5 px-4 py-2.5 rounded font-code text-xs uppercase tracking-wider border transition-colors duration-200 select-none"
              style={{
                background: activeIndex === projects.length - 1
                  ? 'rgba(255,0,153,0.04)'
                  : 'rgba(255,0,153,0.12)',
                borderColor: activeIndex === projects.length - 1
                  ? 'rgba(255,0,153,0.15)'
                  : 'rgba(255,0,153,0.55)',
                color: activeIndex === projects.length - 1
                  ? 'rgba(255,0,153,0.25)'
                  : '#FF0099',
                boxShadow: activeIndex === projects.length - 1
                  ? 'none'
                  : '0 0 12px rgba(255,0,153,0.25)',
              }}
              onClick={() => navigateToProject(activeIndex + 1)}
              disabled={activeIndex === projects.length - 1}
              whileTap={activeIndex < projects.length - 1 ? { scale: 0.93 } : {}}
            >
              Next ▶
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
