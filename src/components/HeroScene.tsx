"use client";

import { useRef, useMemo, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Sparkles, PresentationControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function FlameParticle() {
  const flameRef = useRef<THREE.PointLight>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (flameRef.current) {
      flameRef.current.intensity = 2.4 + Math.sin(time * 14) * 0.4 + Math.cos(time * 26) * 0.2;
    }
    if (meshRef.current) {
      meshRef.current.scale.y = 1 + Math.sin(time * 16) * 0.18;
      meshRef.current.scale.x = 1 + Math.cos(time * 14) * 0.12;
    }
  });

  return (
    <group position={[0.02, 1.48, -0.04]}>
      <pointLight ref={flameRef} color="#FF9933" distance={3.5} decay={2} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshBasicMaterial color="#FFF1A8" />
      </mesh>
    </group>
  );
}

function CakeModel() {
  const { scene } = useGLTF("/models/birthday_cake.glb");
  const modelRef = useRef<THREE.Group>(null);
  const scrollRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const centeredScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const meshName = (child.name || "").toLowerCase();
        if (meshName.includes("cylinder29") || meshName.includes("plate") || meshName.includes("stand")) {
          child.visible = false;
        }
      }
    });

    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 3.1 / maxDim;
    clone.scale.set(scale, scale, scale);
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    return clone;
  }, [scene]);

  useFrame((state) => {
    if (modelRef.current) {
      const scrollRotation = scrollRef.current * 0.002;
      const time = state.clock.getElapsedTime();

      // Smooth damped rotation
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        scrollRotation + time * 0.12,
        0.04
      );

      // Subtle mouse tilt
      const targetRotX = state.pointer.y * 0.1 + 0.12;
      const targetRotZ = -state.pointer.x * 0.08;
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        targetRotX,
        0.04
      );
      modelRef.current.rotation.z = THREE.MathUtils.lerp(
        modelRef.current.rotation.z,
        targetRotZ,
        0.04
      );
    }
  });

  return (
    <group ref={modelRef} position={[0, -0.05, 0]}>
      <primitive object={centeredScene} />
      <FlameParticle />
    </group>
  );
}

useGLTF.preload("/models/birthday_cake.glb");

export default function HeroScene() {
  return (
    <div className="w-full h-full min-h-[460px] lg:min-h-[580px] relative pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 1.4, 5.0], fov: 45 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.3} />
        {/* Warm key light */}
        <directionalLight position={[4, 6, 4]} intensity={2.0} color="#FFF7EE" />
        {/* Rose patisserie fill light */}
        <pointLight position={[-4, 2, 2]} intensity={2.2} color="#FFD1DA" />
        {/* Soft backlight */}
        <pointLight position={[0, -2, -3]} intensity={0.9} color="#FFE1E6" />

        {/* 3D Gold & Rose Sugar Sparkles floating around the cake */}
        <Sparkles
          count={45}
          scale={4.8}
          size={2.6}
          speed={0.4}
          color="#D4AF37"
          opacity={0.65}
        />
        <Sparkles
          count={35}
          scale={4.2}
          size={2.2}
          speed={0.3}
          color="#C4666F"
          opacity={0.55}
        />

        <Suspense fallback={null}>
          <PresentationControls
            global={false}
            snap={true}
            speed={1.5}
            zoom={1}
            polar={[-0.15, 0.25]}
            azimuth={[-0.4, 0.4]}
          >
            <Float
              speed={1.8}
              rotationIntensity={0.2}
              floatIntensity={0.3}
              floatingRange={[-0.08, 0.08]}
            >
              <CakeModel />
            </Float>
          </PresentationControls>

          {/* Soft photorealistic ground contact shadow */}
          <ContactShadows
            position={[0, -1.3, 0]}
            opacity={0.45}
            scale={5}
            blur={2.4}
            far={4}
            color="#3A1F17"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
