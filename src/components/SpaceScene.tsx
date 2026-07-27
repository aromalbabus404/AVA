"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SpaceSceneProps {
  scrollProgress: number;
}

// Starfield Points Generator with Twinkle animation
function Starfield({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = isMobile ? 1500 : 4500;

  // Distribute stars randomly inside a sphere
  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 60 + Math.random() * 80;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi) - 20;
      sz[i] = Math.random() * 1.5 + 0.4;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    // Subtle star twinkle effect
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    if (mat) {
      mat.size = (Math.sin(time * 2.5) * 0.2 + 1.0) * 0.35;
    }
    // Steady slow rotation
    pointsRef.current.rotation.y = time * 0.008;
    pointsRef.current.rotation.x = time * 0.003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#9ae6ff" size={0.35} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

// Low-poly planets positioned at varying depths to create parallax
function Planets() {
  const saturnRef = useRef<THREE.Group>(null);
  const icyRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Rotate planets slowly
    if (saturnRef.current) {
      saturnRef.current.rotation.y = time * 0.08;
    }
    if (icyRef.current) {
      icyRef.current.rotation.y = -time * 0.06;
    }
    if (moonRef.current) {
      moonRef.current.rotation.y = time * 0.12;
      // Moon orbit path around Saturn
      moonRef.current.position.x = -8 + Math.sin(time * 0.5) * 2.4;
      moonRef.current.position.z = -15 + Math.cos(time * 0.5) * 2.4;
    }
  });

  return (
    <group>
      {/* Saturn-like planet with rings */}
      <group ref={saturnRef} position={[-8, -4, -15]}>
        <mesh castShadow>
          <sphereGeometry args={[1.3, 16, 16]} />
          <meshStandardMaterial color="#8b5cff" roughness={0.7} metalness={0.2} />
        </mesh>
        {/* Ring */}
        <mesh rotation={[Math.PI / 2.8, Math.PI / 8, 0]}>
          <ringGeometry args={[1.7, 2.8, 30]} />
          <meshStandardMaterial color="#00f2fe" roughness={0.9} side={THREE.DoubleSide} transparent opacity={0.65} />
        </mesh>
      </group>

      {/* Cyan Icy Planet */}
      <mesh ref={icyRef} position={[7, 3, -25]} castShadow>
        <sphereGeometry args={[1.6, 12, 12]} />
        <meshStandardMaterial color="#00f2fe" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Small metallic moon */}
      <mesh ref={moonRef} position={[-8, -4, -15]} castShadow>
        <sphereGeometry args={[0.32, 8, 8]} />
        <meshStandardMaterial color="#788896" metalness={0.8} roughness={0.15} />
      </mesh>
    </group>
  );
}

// Nebulae glowing dust particles
function Nebulae({ isMobile, scrollProgress }: { isMobile: boolean; scrollProgress: number }) {
  const nebulaGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!nebulaGroupRef.current) return;
    const time = state.clock.getElapsedTime();
    nebulaGroupRef.current.rotation.y = time * 0.02;
    nebulaGroupRef.current.rotation.z = -time * 0.01;
  });

  // Disable nebulae spheres on mobile for performance optimization
  if (isMobile) return null;

  // Fade nebulae as user scrolls past the hero
  const opacityFactor = Math.max(1.0 - scrollProgress * 1.5, 0.08);

  return (
    <group ref={nebulaGroupRef}>
      {/* Cyan Nebula */}
      <mesh position={[-15, 6, -55]}>
        <sphereGeometry args={[12, 16, 16]} />
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.06 * opacityFactor} wireframe={false} side={THREE.BackSide} />
      </mesh>
      {/* Violet Nebula */}
      <mesh position={[18, -8, -65]}>
        <sphereGeometry args={[15, 16, 16]} />
        <meshBasicMaterial color="#8b5cff" transparent opacity={0.08 * opacityFactor} wireframe={false} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

// Camera control and pointer parallax coordinator
function SpaceRig({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const { camera, pointer } = state;

    // 1. Scroll-Driven Dolly: Move camera.z from z=38 down to z=6
    const targetZ = THREE.MathUtils.lerp(38, 6, scrollProgress);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);

    // 2. Cursor Parallax: Lerp rotation based on mouse coordinate offsets
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.08, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.06, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Planets />
    </group>
  );
}

export default function SpaceScene({ scrollProgress }: SpaceSceneProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 38], fov: 45 }}
      >
        {/* Deep space ambient lights */}
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2fe" />
        <directionalLight position={[-5, 5, 2]} intensity={0.8} color="#8b5cff" />

        {/* Starfield particles */}
        <Starfield isMobile={isMobile} />

        {/* Colored Nebula layers */}
        <Nebulae isMobile={isMobile} scrollProgress={scrollProgress} />

        {/* Parallax Rig containing planets */}
        <SpaceRig scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
