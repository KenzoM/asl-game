"use client";
import React, { useRef, useEffect, useState } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { GUI } from "lil-gui";
import { Html } from "@react-three/drei";

import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
// @ts-ignore.
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface ModelProps {
  url: string;
}

const Model = ({ url }: ModelProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const gltf = useLoader(GLTFLoader, url);
  const [isPlaying, setIsPlaying] = useState(true);

  // const { scene, animations } = useGLTF(url);
  // const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    // const gui = new GUI();
    // if (!ref.current) return;
    // gui.add(ref.current.position, "x").min(-10).max(10).name("Position X");
    // gui.add(ref.current.position, "y").min(-10).max(10).name("Position Y");
    // gui.add(ref.current.position, "z").min(-10).max(10).name("Position Z");
    // gui.add(ref.current.scale, "x").min(0).max(10).name("Scale X");
    // gui.add(ref.current.scale, "y").min(0).max(10).name("Scale Y");
    // gui.add(ref.current.scale, "z").min(0).max(10).name("Scale Z");
    // gui.add(ref.current.rotation, "x").min(0).max(10).name("rotation X");
    // gui.add(ref.current.rotation, "y").min(0).max(10).name("rotation Y");
    // gui.add(ref.current.rotation, "z").min(0).max(10).name("rotation Z");
    // if (actions["Take 001"]) {
    //   gui.add(actions["Take 001"], "timeScale").min(0).max(2).name("Speed");
    // }
    // if (isPlaying) {
    //   actions["Take 001"].play().paused = false;
    // } else {
    //   actions["Take 001"].play().paused = true;
    // }
  }, []);

  return (
    <mesh
      ref={ref}
      position={[0, -2.2, 3]}
      rotation={[0.0, 0.3, 0]}
      scale={[2, 1.89, 1.89]}
    >
      <primitive object={gltf.scene} />
    </mesh>
  );
};

export default Model;
