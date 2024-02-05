import { useEffect } from "react";
import { GUI } from "lil-gui";
import * as THREE from "three";
const useGUIControls = (ref: React.RefObject<THREE.Mesh>) => {
  useEffect(() => {
    const gui = new GUI();
    if (!ref.current) return;
    gui.add(ref.current.position, "x").min(-10).max(10).name("Position X");
    gui.add(ref.current.position, "y").min(-10).max(10).name("Position Y");
    gui.add(ref.current.position, "z").min(-10).max(10).name("Position Z");
    gui.add(ref.current.scale, "x").min(0).max(10).name("Scale X");
    gui.add(ref.current.scale, "y").min(0).max(10).name("Scale Y");
    gui.add(ref.current.scale, "z").min(0).max(10).name("Scale Z");
    gui.add(ref.current.rotation, "x").min(0).max(10).name("Rotation X");
    gui.add(ref.current.rotation, "y").min(0).max(10).name("Rotation Y");
    gui.add(ref.current.rotation, "z").min(0).max(10).name("Rotation Z");
  }, [ref]);
};

export default useGUIControls;
