import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function HolographicPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#00FFFF') },
      uColor2: { value: new THREE.Color('#FF0099') },
      uColor3: { value: new THREE.Color('#8A2BE2') },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      float wave1 = sin(pos.x * 3.0 + uTime * 0.5) * 0.05;
      float wave2 = sin(pos.y * 4.0 + uTime * 0.7) * 0.03;
      float wave3 = cos(pos.x * 2.0 + pos.y * 3.0 + uTime * 0.3) * 0.04;
      pos.z += wave1 + wave2 + wave3;
      vElevation = wave1 + wave2 + wave3;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      // Grid pattern
      float gridX = smoothstep(0.48, 0.5, fract(vUv.x * 20.0));
      float gridY = smoothstep(0.48, 0.5, fract(vUv.y * 20.0));
      float grid = max(gridX, gridY) * 0.15;
      
      // Scan line
      float scanLine = smoothstep(0.0, 0.02, abs(fract(vUv.y * 40.0 - uTime * 0.2) - 0.5));
      float scan = (1.0 - scanLine) * 0.1;
      
      // Color gradient
      vec3 color = mix(uColor1, uColor2, vUv.x + sin(uTime * 0.3) * 0.3);
      color = mix(color, uColor3, vUv.y * 0.5);
      
      // Holographic shimmer
      float shimmer = sin(vUv.x * 30.0 + uTime * 2.0) * sin(vUv.y * 30.0 - uTime * 1.5);
      shimmer = shimmer * 0.5 + 0.5;
      
      // Elevation-based brightness
      float brightness = vElevation * 3.0 + 0.5;
      
      float alpha = (grid + scan + shimmer * 0.05) * brightness;
      alpha = clamp(alpha, 0.0, 0.15);
      
      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -3, -2]}>
      <planeGeometry args={[20, 15, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function HolographicShader() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <HolographicPlane />
      </Canvas>
    </div>
  );
}
