"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FloatingCard } from "./FloatingCard";
import { AnalyticsChart } from "./AnalyticsChart";

export const Dashboard3D = () => {
  const group = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!group.current) return;
    
    // Mouse movement drives the tilt. state.pointer gives normalized coords -1 to +1
    targetRotation.current.x = (state.pointer.y * Math.PI) / 8;
    targetRotation.current.y = (state.pointer.x * Math.PI) / 8;

    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotation.current.x, 0.05);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetRotation.current.y, 0.05);

    // Floating animation for the entire group
    group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <group ref={group} rotation={[0, 0, 0]}>

      {/* Central Interactive Elements */}
      <FloatingCard position={[0, 0.5, 0]} title="Total Revenue" value="$124,592" delay={0}>
         <AnalyticsChart />
      </FloatingCard>

      <FloatingCard position={[3.5, 1.5, -1]} title="Active Projects" value="24" delay={1.2}>
         <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-[6px] border-white/5 border-t-primary border-r-primary shadow-[0_0_20px_rgba(124,58,237,0.6)]" />
         </div>
      </FloatingCard>

      <FloatingCard position={[-3.5, 1.2, -0.5]} title="New Clients" value="142" delay={0.8}>
         <div className="flex flex-col gap-3 mt-2">
            {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-white/20 to-white/5" />
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-primary" style={{ width: `${80 - i * 15}%` }} />
                  </div>
               </div>
            ))}
         </div>
      </FloatingCard>
      
      <FloatingCard position={[2.5, -1.8, 0.5]} title="Pending Tasks" value="12" delay={2.5}>
         <div className="flex flex-col gap-3 mt-2">
            {[1, 2].map((i) => (
               <div key={i} className="flex items-center gap-3 bg-white/5 p-2 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-accent shadow-[0_0_10px_#f43f5e]' : 'bg-primary shadow-[0_0_10px_#7c3aed]'}`} />
                  <div className="h-2 w-full bg-white/10 rounded-full" />
               </div>
            ))}
         </div>
      </FloatingCard>

    </group>
  );
};
