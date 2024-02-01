import { ReactNode, createContext, useState } from "react";

export interface AnimationContextType {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <AnimationContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </AnimationContext.Provider>
  );
};

export { AnimationContext, AnimationProvider };
