"use client";
import { ReactNode, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimationProvider } from "@/app/context/AnimationContext";
import PlayButton from "@/components/PlayButton";
import Loading from "@/components/Loading";

const CanvasThree = ({ children }: { children: ReactNode }) => {
  return (
    <AnimationProvider>
      <Suspense fallback={<Loading />}>
        <Canvas
          style={{
            width: "100%",
            height: "50vh",
            // border: "1px dashed red",
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
        <PlayButton />
      </Suspense>
    </AnimationProvider>
  );
};

export default CanvasThree;
