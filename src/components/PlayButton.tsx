import React, { useContext } from "react";
import {
  AnimationContext,
  AnimationContextType,
} from "@/app/context/AnimationContext";

const PlayButton: React.FC = () => {
  const { isPlaying, setIsPlaying } = useContext(
    AnimationContext
  ) as AnimationContextType;

  const handleClick = () => {
    if (setIsPlaying) {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      className="bg-white text-black border rounded w-1/2"
      onClick={handleClick}
    >
      {isPlaying ? "Pause" : "Play"}
    </button>
  );
};

export default PlayButton;
