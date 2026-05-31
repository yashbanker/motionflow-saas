"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { Dashboard3D } from "./Dashboard3D";
import { Suspense } from "react";

export const ThreeScene = () => {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Suspense fallback={null}>
          <Dashboard3D />
          <Environment preset="city" />
          {/* ContactShadows gives a nice grounded depth effect under the floating dashboard */}
          <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={25} blur={2} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
};
