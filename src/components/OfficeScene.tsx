"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OfficeSceneProps {
  scrollProgress: number;
}

// Camera Rig to smoothly animate position and focus target along scroll milestones
function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  useFrame((state) => {
    const { camera } = state;
    
    // Keyframes: [progress, pos_x, pos_y, pos_z, look_x, look_y, look_z]
    const keyframes: [number, number, number, number, number, number, number][] = [
      [0.0, 1.0, 2.2, -5.8, 0.0, 1.1, -3.0],     // Step 1: Cinematic view outside/near the door as guy walks in
      [0.2, 3.2, 2.8, 4.0, 0.0, 1.1, -1.0],      // Step 2: Camera pans wide as guy walks to desk
      [0.45, -0.2, 1.6, 1.8, -1.2, 1.1, -1.0],   // Step 3: Pushes in close as guy sits down
      [0.68, -1.36, 1.07, -0.62, -1.5, 1.065, -1.18], // Step 4: Full zoom close-up directly into the glowing laptop project screen
      [0.85, -2.2, 1.3, 0.6, -1.5, 1.0, -0.8],   // Team: Focus near developer characters
      [1.0, 4.2, 3.5, 5.5, 0.0, 1.1, -1.0],      // Contact: Pull back wide overview
    ];

    let startFrame = keyframes[0];
    let endFrame = keyframes[keyframes.length - 1];

    for (let i = 0; i < keyframes.length - 1; i++) {
      if (scrollProgress >= keyframes[i][0] && scrollProgress <= keyframes[i + 1][0]) {
        startFrame = keyframes[i];
        endFrame = keyframes[i + 1];
        break;
      }
    }

    const segmentRange = endFrame[0] - startFrame[0];
    const t = segmentRange > 0 ? (scrollProgress - startFrame[0]) / segmentRange : 0;

    // Smooth cubic easing for camera interpolation
    const easeT = t * t * (3 - 2 * t);

    const targetPosX = THREE.MathUtils.lerp(startFrame[1], endFrame[1], easeT);
    const targetPosY = THREE.MathUtils.lerp(startFrame[2], endFrame[2], easeT);
    const targetPosZ = THREE.MathUtils.lerp(startFrame[3], endFrame[3], easeT);

    const targetLookX = THREE.MathUtils.lerp(startFrame[4], endFrame[4], easeT);
    const targetLookY = THREE.MathUtils.lerp(startFrame[5], endFrame[5], easeT);
    const targetLookZ = THREE.MathUtils.lerp(startFrame[6], endFrame[6], easeT);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetPosX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetPosY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetPosZ, 0.06);

    const targetLook = new THREE.Vector3(targetLookX, targetLookY, targetLookZ);
    camera.lookAt(targetLook);
  });

  return null;
}

// Flat screen texture showing masterpool
function ScreenTexture() {
  const canvas = useMemo(() => {
    if (typeof window === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 384;
    const ctx = c.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#05060a";
      ctx.fillRect(0, 0, 512, 384);
      
      // Header
      ctx.fillStyle = "#12131a";
      ctx.fillRect(0, 0, 512, 45);
      
      ctx.fillStyle = "#3de0ff";
      ctx.font = "bold 14px monospace";
      ctx.fillText("https://masterpool.in", 20, 28);

      // Contents
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px sans-serif";
      ctx.fillText("MASTERPOOL", 40, 140);

      ctx.fillStyle = "#8b5cff";
      ctx.font = "16px sans-serif";
      ctx.fillText("Scalable web platforms designed with Node.js", 40, 180);

      ctx.strokeStyle = "#3de0ff";
      ctx.lineWidth = 2;
      ctx.strokeRect(40, 220, 432, 120);
      ctx.fillStyle = "rgba(61, 224, 255, 0.05)";
      ctx.fillRect(40, 220, 432, 120);
    }
    return c;
  }, []);

  if (!canvas) return null;
  return <canvasTexture attach="map" image={canvas} />;
}

// Model for developer character styled as a cartoon teen (hoodie, jeans, sneakers, cap)
interface DeveloperProps {
  x: number;
  y: number;
  z: number;
  rotationY: number;
  isSitting: boolean;
  isLaptopInHand: boolean;
  scrollProgress: number;
}

function DeveloperCharacter({
  x,
  y,
  z,
  rotationY,
  isSitting,
  isLaptopInHand,
  scrollProgress,
}: DeveloperProps) {
  const leftHandRef = useRef<THREE.Mesh>(null);
  const rightHandRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);

  // Colors matching the cartoon teen model reference
  const skinTone = "#4a2f26"; // Dark skin tone
  const hoodieColor = "#ff4500"; // Orange hoodie
  const jeansColor = "#1a237e"; // Indigo blue jeans
  const sneakerColor = "#ffffff"; // White sneakers
  const capColor = "#111111"; // Black cap

  // Animate walking legs swing and typing hands loops
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (isSitting) {
      // Sits: Hand typing animation
      if (leftHandRef.current) {
        leftHandRef.current.position.y = 0.92 + Math.sin(time * 16) * 0.03;
        leftHandRef.current.position.z = -0.36 + Math.cos(time * 14) * 0.01;
      }
      if (rightHandRef.current) {
        rightHandRef.current.position.y = 0.92 + Math.cos(time * 19) * 0.03;
        rightHandRef.current.position.z = -0.36 + Math.sin(time * 15) * 0.01;
      }
      // Reset legs rotation to sitting posture
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = -Math.PI / 2;
        leftLegRef.current.position.y = 0.2;
        leftLegRef.current.position.z = 0.15;
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = -Math.PI / 2;
        rightLegRef.current.position.y = 0.2;
        rightLegRef.current.position.z = 0.15;
      }
    } else {
      // Walking: Swing legs back and forth
      const swingSpeed = 26;
      const legAngle = Math.sin(scrollProgress * swingSpeed) * 0.45;
      
      if (leftLegRef.current) {
        leftLegRef.current.rotation.x = legAngle;
        leftLegRef.current.position.y = 0.05;
        leftLegRef.current.position.z = 0;
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = -legAngle;
        rightLegRef.current.position.y = 0.05;
        rightLegRef.current.position.z = 0;
      }
    }
  });

  return (
    <group position={[x, y, z]} rotation={[0, rotationY, 0]}>
      {/* Torso (Orange Hoodie) */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.24, 0.55, 16]} />
        <meshStandardMaterial color={hoodieColor} roughness={0.6} />
      </mesh>
      
      {/* Hoodie Collar/Neck */}
      <mesh position={[0, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.06, 16]} />
        <meshStandardMaterial color={hoodieColor} roughness={0.6} />
      </mesh>

      {/* Head (Dark skin tone) */}
      <mesh position={[0, 0.88, 0]} castShadow>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color={skinTone} roughness={0.5} />
      </mesh>

      {/* Cap Dome */}
      <mesh position={[0, 0.96, -0.02]} castShadow>
        <sphereGeometry args={[0.165, 16, 16]} />
        <meshStandardMaterial color={capColor} roughness={0.7} />
      </mesh>
      {/* Cap Brim (Visual detail) */}
      <mesh position={[0, 0.99, 0.1]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.2, 0.02, 0.12]} />
        <meshStandardMaterial color={capColor} roughness={0.7} />
      </mesh>

      {/* Legs (Indigo Jeans) */}
      {/* Left Leg */}
      <mesh ref={leftLegRef} position={[-0.1, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.04, 0.35, 8]} />
        <meshStandardMaterial color={jeansColor} roughness={0.6} />
      </mesh>
      {/* Left Sneaker */}
      <mesh position={[-0.1, -0.12, 0.04]} castShadow>
        <boxGeometry args={[0.07, 0.06, 0.14]} />
        <meshStandardMaterial color={sneakerColor} roughness={0.5} />
      </mesh>

      {/* Right Leg */}
      <mesh ref={rightLegRef} position={[0.1, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.04, 0.35, 8]} />
        <meshStandardMaterial color={jeansColor} roughness={0.6} />
      </mesh>
      {/* Right Sneaker */}
      <mesh position={[0.1, -0.12, 0.04]} castShadow>
        <boxGeometry args={[0.07, 0.06, 0.14]} />
        <meshStandardMaterial color={sneakerColor} roughness={0.5} />
      </mesh>

      {/* Arms & Hands */}
      {isSitting ? (
        <group>
          {/* Left Arm */}
          <mesh position={[-0.24, 0.45, -0.15]} rotation={[0.4, -0.2, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.04, 0.25, 8]} />
            <meshStandardMaterial color={hoodieColor} roughness={0.6} />
          </mesh>
          <mesh ref={leftHandRef} position={[-0.22, 0.92, -0.36]} castShadow>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color={skinTone} roughness={0.5} />
          </mesh>

          {/* Right Arm */}
          <mesh position={[0.24, 0.45, -0.15]} rotation={[0.4, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.04, 0.25, 8]} />
            <meshStandardMaterial color={hoodieColor} roughness={0.6} />
          </mesh>
          <mesh ref={rightHandRef} position={[0.22, 0.92, -0.36]} castShadow>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color={skinTone} roughness={0.5} />
          </mesh>
        </group>
      ) : (
        // Walking stance (holding laptop in left hand close to body)
        <group>
          {/* Left Arm holding laptop */}
          <mesh position={[-0.24, 0.38, -0.1]} rotation={[0.6, -0.4, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.04, 0.25, 8]} />
            <meshStandardMaterial color={hoodieColor} roughness={0.6} />
          </mesh>
          <mesh position={[-0.22, 0.22, -0.2]} castShadow>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color={skinTone} roughness={0.5} />
          </mesh>

          {/* Render Laptop attached to hand if walking */}
          {isLaptopInHand && (
            <group position={[-0.26, 0.18, -0.28]} rotation={[0.2, -0.2, 0.5]}>
              {/* Laptop base */}
              <mesh castShadow>
                <boxGeometry args={[0.36, 0.02, 0.24]} />
                <meshStandardMaterial color="#1a1c24" roughness={0.4} metalness={0.8} />
              </mesh>
              {/* Laptop screen (closed) */}
              <mesh position={[0, 0.015, 0]} castShadow>
                <boxGeometry args={[0.36, 0.02, 0.24]} />
                <meshStandardMaterial color="#1a1c24" roughness={0.4} metalness={0.8} />
              </mesh>
            </group>
          )}

          {/* Right Arm swaying */}
          <mesh
            position={[0.24, 0.38, 0]}
            rotation={[Math.sin(scrollProgress * 26) * 0.4, 0, 0]}
            castShadow
          >
            <cylinderGeometry args={[0.05, 0.04, 0.25, 8]} />
            <meshStandardMaterial color={hoodieColor} roughness={0.6} />
          </mesh>
          <mesh position={[0.24, 0.22, 0]} castShadow>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color={skinTone} roughness={0.5} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// Low-poly room elements with active entrance door opening
function RoomEnvironment({ scrollProgress }: { scrollProgress: number }) {
  // Door Swings Open between scroll 0.0 and 0.15
  const doorRotationY = useMemo(() => {
    if (scrollProgress < 0.15) {
      const t = scrollProgress / 0.15;
      return -t * (Math.PI * 0.55); // Open ~100 degrees
    }
    return -Math.PI * 0.55;
  }, [scrollProgress]);

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[10, 0.1, 10]} />
        <meshStandardMaterial color="#0c0e14" roughness={0.8} />
      </mesh>

      <gridHelper args={[10, 20, "#1d3d47", "#0c0e14"]} position={[0, 0.01, 0]} />

      {/* Back Wall */}
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <boxGeometry args={[10, 5, 0.1]} />
        <meshStandardMaterial color="#08090d" roughness={0.9} />
      </mesh>

      {/* Entrance Door Frame on Back Wall */}
      <group position={[0, 1.25, -4.95]}>
        {/* Frame left */}
        <mesh position={[-0.65, 0, 0]}><boxGeometry args={[0.1, 2.5, 0.15]} /><meshStandardMaterial color="#1a1c24" /></mesh>
        {/* Frame right */}
        <mesh position={[0.65, 0, 0]}><boxGeometry args={[0.1, 2.5, 0.15]} /><meshStandardMaterial color="#1a1c24" /></mesh>
        {/* Frame top */}
        <mesh position={[0, 1.25, 0]}><boxGeometry args={[1.4, 0.1, 0.15]} /><meshStandardMaterial color="#1a1c24" /></mesh>

        {/* Dynamic Opening Door Panel (pivoted on right edge) */}
        <group position={[0.6, 0, 0]} rotation={[0, doorRotationY, 0]}>
          <mesh position={[-0.6, 0, 0]} castShadow>
            <boxGeometry args={[1.2, 2.4, 0.06]} />
            <meshStandardMaterial color="#2d3142" roughness={0.75} />
          </mesh>
          {/* Door Handle */}
          <mesh position={[-1.1, 0, 0.04]} castShadow>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color="#3de0ff" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </group>

      {/* Left Wall */}
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 5, 0.1]} />
        <meshStandardMaterial color="#08090d" roughness={0.9} />
      </mesh>

      {/* Window on Left Wall casting light */}
      <group position={[-4.9, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[2.0, 3.0, 0.08]} />
          <meshStandardMaterial color="#1a1d24" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[1.8, 2.8, 0.02]} />
          <meshStandardMaterial
            color="#3de0ff"
            emissive="#3de0ff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.4}
          />
        </mesh>
        <spotLight
          position={[0, 0, 2.5]}
          angle={Math.PI / 4}
          penumbra={0.9}
          intensity={2.0}
          color="#3de0ff"
          castShadow
        />
      </group>

      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 6, 5]} intensity={0.7} color="#8b5cff" castShadow />
    </group>
  );
}

// Workstation 1 (The main workstation we zoom into)
interface WorkstationProps {
  lidAngle: number;
  isLaptopOnDesk: boolean;
}

function Workstation({ lidAngle, isLaptopOnDesk }: WorkstationProps) {
  return (
    <group position={[-1.5, 0, -1.0]} rotation={[0, Math.PI / 2, 0]}>
      {/* Table */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.05, 0.9]} />
        <meshStandardMaterial color="#12141c" roughness={0.6} />
      </mesh>
      <mesh position={[-0.8, 0.375, -0.38]} castShadow><cylinderGeometry args={[0.025, 0.025, 0.75, 12]} /><meshStandardMaterial color="#08090d" /></mesh>
      <mesh position={[0.8, 0.375, -0.38]} castShadow><cylinderGeometry args={[0.025, 0.025, 0.75, 12]} /><meshStandardMaterial color="#08090d" /></mesh>
      <mesh position={[-0.8, 0.375, 0.38]} castShadow><cylinderGeometry args={[0.025, 0.025, 0.75, 12]} /><meshStandardMaterial color="#08090d" /></mesh>
      <mesh position={[0.8, 0.375, 0.38]} castShadow><cylinderGeometry args={[0.025, 0.025, 0.75, 12]} /><meshStandardMaterial color="#08090d" /></mesh>

      {/* Laptop (Rendered only when character releases/places it on desk) */}
      {isLaptopOnDesk && (
        <group position={[0, 0.775, 0.1]}>
          <mesh castShadow>
            <boxGeometry args={[0.42, 0.015, 0.28]} />
            <meshStandardMaterial color="#1f222a" roughness={0.4} metalness={0.8} />
          </mesh>
          
          {/* Laptop Screen Lid */}
          <group position={[0, 0.008, -0.14]} rotation={[lidAngle, 0, 0]}>
            <mesh position={[0, 0.14, -0.005]} castShadow>
              <boxGeometry args={[0.42, 0.28, 0.015]} />
              <meshStandardMaterial color="#1f222a" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.14, 0.005]}>
              <boxGeometry args={[0.4, 0.26, 0.005]} />
              <meshStandardMaterial emissive="#ffffff" emissiveIntensity={0.8}>
                <ScreenTexture />
              </meshStandardMaterial>
            </mesh>
            <spotLight
              position={[0, 0.14, 0.15]}
              angle={Math.PI / 3}
              penumbra={0.7}
              intensity={1.2}
              color="#3de0ff"
            />
          </group>
        </group>
      )}

      {/* Ergonomic Chair */}
      <group position={[0, 0.4, 0.7]} rotation={[0, Math.PI, 0]}>
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.46, 0.08, 0.46]} />
          <meshStandardMaterial color="#151821" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4]} />
          <meshStandardMaterial color="#08090d" />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.42, 0.04, 0.06]} />
          <meshStandardMaterial color="#08090d" />
        </mesh>
        <mesh position={[0, 0.4, -0.21]} castShadow>
          <boxGeometry args={[0.04, 0.5, 0.03]} />
          <meshStandardMaterial color="#08090d" />
        </mesh>
        <mesh position={[0, 0.6, -0.21]} castShadow>
          <boxGeometry args={[0.4, 0.32, 0.05]} />
          <meshStandardMaterial color="#151821" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export default function OfficeScene({ scrollProgress }: OfficeSceneProps) {
  // Determine character coordinates, posture, and laptop ownership
  // 1. Walk from entrance [0, 0.22, -4.5] -> Walk aisle [0, 0.22, -0.3] -> Sit down [-1.5, 0.12, -0.3]
  const characterData = useMemo(() => {
    let x = 0;
    let y = 0.22;
    let z = -4.5;
    let rotationY = 0; // facing forward
    let isSitting = false;
    let isLaptopInHand = true;

    if (scrollProgress < 0.15) {
      x = 0;
      z = -4.5 + (scrollProgress / 0.15) * 1.5; // moves to z = -3.0
      rotationY = 0;
      isLaptopInHand = true;
    } else if (scrollProgress >= 0.15 && scrollProgress < 0.4) {
      const t = (scrollProgress - 0.15) / 0.25;
      isLaptopInHand = true;
      if (t < 0.6) {
        const pathT = t / 0.6;
        x = 0;
        z = -3.0 + pathT * 2.7; // walks to z = -0.3
        rotationY = 0;
      } else {
        const turnT = (t - 0.6) / 0.4;
        x = -turnT * 1.5; // walks to x = -1.5
        z = -0.3;
        rotationY = Math.PI / 2;
      }
    } else {
      x = -1.5;
      z = -0.3;
      rotationY = Math.PI / 2;
      isSitting = true;
      isLaptopInHand = false; // laptop is now on the desk!

      // Adjust height downwards to sit on the chair seat (y = 0.12 sitting)
      const sitProgress = Math.min((scrollProgress - 0.4) / 0.1, 1);
      y = 0.22 - sitProgress * 0.1; 
    }

    return { x, y, z, rotationY, isSitting, isLaptopInHand };
  }, [scrollProgress]);

  // 2. Laptop Lid Open Angle (Opens between progress 0.45 and 0.58)
  const lidAngle = useMemo(() => {
    if (scrollProgress < 0.45) return 0; // Closed
    if (scrollProgress >= 0.45 && scrollProgress < 0.58) {
      const t = (scrollProgress - 0.45) / 0.13;
      return t * (Math.PI * 0.65); // Open to ~117 degrees
    }
    return Math.PI * 0.65;
  }, [scrollProgress]);

  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas
        shadows
        camera={{ position: [4.2, 3.5, 5.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <RoomEnvironment scrollProgress={scrollProgress} />

        {/* Workstation 1 */}
        <Workstation 
          lidAngle={lidAngle} 
          isLaptopOnDesk={!characterData.isLaptopInHand} 
        />

        {/* Dynamic Developer Character (Cartoon teen boy layout) */}
        <DeveloperCharacter 
          x={characterData.x}
          y={characterData.y}
          z={characterData.z}
          rotationY={characterData.rotationY}
          isSitting={characterData.isSitting}
          isLaptopInHand={characterData.isLaptopInHand}
          scrollProgress={scrollProgress}
        />

        {/* Studio Plants */}
        <group position={[3.8, 0, -4.0]}>
          <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.16, 0.1, 0.35, 8]} /><meshStandardMaterial color="#cc8866" /></mesh>
          <mesh position={[0, 0.4, 0]}><sphereGeometry args={[0.2, 8, 8]} /><meshStandardMaterial color="#3a9d63" /></mesh>
        </group>
        <group position={[-4.0, 0, 3.8]}>
          <mesh position={[0, 0.2, 0]}><cylinderGeometry args={[0.16, 0.1, 0.35, 8]} /><meshStandardMaterial color="#cc8866" /></mesh>
          <mesh position={[0, 0.4, 0]}><sphereGeometry args={[0.2, 8, 8]} /><meshStandardMaterial color="#2d7a4d" /></mesh>
        </group>

        {/* Camera rig controller */}
        <CameraRig scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
