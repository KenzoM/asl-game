"use client";
import React, { useRef, useEffect, useContext } from "react";
import {
  AnimationContext,
  AnimationContextType,
} from "@/app/context/AnimationContext";

import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
// @ts-ignore.
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface ModelProps {
  url: string;
}

const Model = ({ url }: ModelProps) => {
  const ref = useRef<THREE.Mesh>(null);
  const gltf = useLoader(GLTFLoader, url);
  const { isPlaying, setIsPlaying } = useContext(
    AnimationContext
  ) as AnimationContextType;

  let mixer: THREE.AnimationMixer;
  let action: THREE.AnimationAction | null = null;
  useEffect(() => {
    if (isPlaying && action) {
      action.play();
    } else {
      if (action) {
        action.clampWhenFinished = true;
        action.timeScale = 0;
      }
    }
  }, [isPlaying, action]);

  if (gltf.animations.length) {
    mixer = new THREE.AnimationMixer(gltf.scene);
    const selectedAnimation = gltf.animations[0]; // Select the first animation
    action = mixer.clipAction(selectedAnimation);
    action.clampWhenFinished = true;
    action.loop = THREE.LoopOnce;

    mixer.addEventListener("finished", () => {
      setIsPlaying(false);
    });
  }

  useFrame((_, delta) => {
    mixer?.update(delta);
  });

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
