"use client";
import { ReactElement, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Object3D } from "three";
const CanvasThree = ({ children }: { children: ReactNode }) => {
  return (
    <Canvas
      style={{
        width: "100%",
        height: "50vh",
        maxWidth: "430px",
        border: "1px dashed red",
      }}
      camera={{
        near: 0.1,
        far: 10000,
        position: [0, 0.5, 5],
      }}
    >
      {/* <OrbitControls /> */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[1, 1, 1]} intensity={2} />
      {children}
    </Canvas>
  );
};

export default CanvasThree;
