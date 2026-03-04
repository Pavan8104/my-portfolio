import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 800 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return [pos, vel];
  }, [count]);

  useFrame(({ mouse }) => {
    if (!mesh.current) return;
    const geo = mesh.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    mousePos.current.x += (mouse.x * 2 - mousePos.current.x) * 0.02;
    mousePos.current.y += (mouse.y * 2 - mousePos.current.y) * 0.02;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3] + mousePos.current.x * 0.001;
      arr[i * 3 + 1] += velocities[i * 3 + 1] + mousePos.current.y * 0.001;
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      if (arr[i * 3] > 15) arr[i * 3] = -15;
      if (arr[i * 3] < -15) arr[i * 3] = 15;
      if (arr[i * 3 + 1] > 15) arr[i * 3 + 1] = -15;
      if (arr[i * 3 + 1] < -15) arr[i * 3 + 1] = 15;
      if (arr[i * 3 + 2] > 10) arr[i * 3 + 2] = -10;
      if (arr[i * 3 + 2] < -10) arr[i * 3 + 2] = 10;
    }
    posAttr.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#00FFFF"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GridPlane() {
  const ref = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.z = (clock.getElapsedTime() * 0.3) % 2;
  });

  return (
    <gridHelper
      ref={ref}
      args={[60, 60, '#00FFFF', '#00FFFF']}
      position={[0, -8, 0]}
      material-opacity={0.04}
      material-transparent
    />
  );
}

function NeonLines() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const mat = (child as THREE.Mesh).material as THREE.LineBasicMaterial;
      if (mat && mat.opacity !== undefined) {
        mat.opacity = 0.1 + Math.sin(clock.getElapsedTime() * 0.5 + i * 1.2) * 0.08;
      }
    });
  });

  const lines = useMemo(() => {
    const result: { points: THREE.Vector3[]; color: string }[] = [];
    for (let i = 0; i < 8; i++) {
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10 - 5;
      result.push({
        points: [new THREE.Vector3(-20, y, z), new THREE.Vector3(20, y, z)],
        color: i % 2 === 0 ? '#00FFFF' : '#FF0099',
      });
    }
    return result;
  }, []);

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(line.points);
        const mat = new THREE.LineBasicMaterial({
          color: line.color,
          transparent: true,
          opacity: 0.1,
          blending: THREE.AdditiveBlending,
        });
        return <primitive key={i} object={new THREE.Line(geo, mat)} />;
      })}
    </group>
  );
}

export default function StarfieldBackground() {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <Particles count={600} />
        <GridPlane />
        <NeonLines />
      </Canvas>
    </div>
  );
}
