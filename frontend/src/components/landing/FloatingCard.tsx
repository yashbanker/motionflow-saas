"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface FloatingCardProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  value: string;
  delay?: number;
  children?: React.ReactNode;
}

export const FloatingCard = ({ position, rotation = [0, 0, 0], title, value, delay = 0, children }: FloatingCardProps) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime() + delay;
    group.current.position.y = position[1] + Math.sin(t * 1.5) * 0.08;
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      <Html transform distanceFactor={1.5} center>
        <div data-cursor-card className="hover-card w-64 h-40 glass rounded-2xl border border-white/10 shadow-[0_10px_40px_rgba(124,58,237,0.15)] p-5 flex flex-col overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-xl pointer-events-auto select-none">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-3xl font-bold mt-1 text-white">{value}</p>
          <div className="flex-1 mt-4 relative">
            {children}
          </div>
        </div>
      </Html>
    </group>
  );
};
