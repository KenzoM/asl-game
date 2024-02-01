"use client";
import React, { useRef, useEffect, useContext } from "react";
import { useAnimations } from "@react-three/drei";
import { GUI } from "lil-gui";
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
  }, []);

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
