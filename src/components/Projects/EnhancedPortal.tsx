import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../../hooks/useAudio';
import type { Project } from '../../data/projects';

function OrbitRing({
  radius,
  color,
  speed,
  wireframe = false,
}: {
  radius: number;
  color: string;
  speed: number;
  wireframe?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.getElapsedTime() * speed * 0.3;
    ref.current.rotation.y = clock.getElapsedTime() * speed * 0.5;
    ref.current.rotation.z = clock.getElapsedTime() * speed * 0.2;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.015, 16, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={wireframe ? 0.15 : 0.3}
        wireframe={wireframe}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function FloatingParticles({ count = 40 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 1.5 + Math.random() * 1.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#00FFFF"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Portal3DScene() {
  return (
    <>
      <OrbitRing radius={2.2} color="#00FFFF" speed={0.3} />
      <OrbitRing radius={1.8} color="#FF0099" speed={-0.4} />
      <OrbitRing radius={1.4} color="#8A2BE2" speed={0.5} wireframe />
      <OrbitRing radius={2.6} color="#00FFFF" speed={-0.15} wireframe />
      <FloatingParticles count={60} />
    </>
  );
}

interface EnhancedPortalProps {
  project: Project;
  onClose: () => void;
}

export default function EnhancedPortal({ project, onClose }: EnhancedPortalProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.95)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
      >
        {/* 3D Background */}
        <div className="absolute inset-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, alpha: true }}
            style={{ background: 'transparent' }}
          >
            <Portal3DScene />
          </Canvas>
        </div>

        {/* Floating tech tags orbiting */}
        <div className="absolute inset-0 pointer-events-none">
          {project.tags.map((tag, i) => {
            const angle = (i * Math.PI * 2) / project.tags.length;
            const rx = 35 + Math.cos(angle) * 22;
            const ry = 35 + Math.sin(angle) * 18;
            return (
              <motion.div
                key={tag}
                className="absolute neon-badge text-[10px]"
                style={{ left: `${rx}%`, top: `${ry}%` }}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                {tag}
              </motion.div>
            );
          })}
        </div>

        {/* Content panel */}
        <motion.div
          className="relative z-10 cyber-glass-strong p-6 md:p-10 max-w-lg w-full mx-4 text-center"
          initial={{ y: 60, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glowing header line */}
          <div
            className="absolute top-0 left-[10%] right-[10%] h-[2px]"
            style={{
              background: 'linear-gradient(90deg, transparent, #00FFFF, #FF0099, transparent)',
              boxShadow: '0 0 10px rgba(0,255,255,0.5)',
            }}
          />

          <h2 className="font-cyber text-xl md:text-2xl neon-text-pink uppercase tracking-widest mb-3 mt-2">
            {project.title}
          </h2>
          <p className="font-code text-cyber-blue-dim text-sm mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="neon-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="flex gap-4 justify-center mb-4">
            {project.github && (
              <motion.button
                className="cyber-button px-6 py-2"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  playSound('click');
                  window.open(project.github, '_blank');
                }}
              >
                {'<>'} Code
              </motion.button>
            )}
            {project.live && (
              <motion.button
                className="cyber-button-pink px-6 py-2"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  playSound('whoosh');
                  window.open(project.live, '_blank');
                }}
              >
                Launch 🚀
              </motion.button>
            )}
          </div>

          <motion.button
            className="cyber-button-red text-xs px-5 py-2 mt-2"
            whileHover={{ scale: 1.05 }}
            onClick={onClose}
          >
            ✕ Close Portal
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
