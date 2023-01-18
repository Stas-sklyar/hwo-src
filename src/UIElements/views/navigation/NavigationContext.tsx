import * as Constants from "platform/config/constants";
import React, { createContext, useState } from "react";

interface NavigationContextInterface {
  preset: string;
  enterAnimation: string | null;
  exitAnimation: string | null;
  setPreset: React.Dispatch<string>;
  setEnterAnimation: React.Dispatch<string>;
  setExitAnimation: React.Dispatch<string>;
}

const NavigationContext = createContext<NavigationContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

function NavigationContextProvider({ children }: Props) {
  const [preset, setPreset] = useState(Constants.DEFAULT_ANIMATION_PRESET);
  const [enterAnimation, setEnterAnimation] = useState("");
  const [exitAnimation, setExitAnimation] = useState("");

  const navigationContext: NavigationContextInterface = {
    preset,
    enterAnimation,
    exitAnimation,
    setPreset,
    setEnterAnimation,
    setExitAnimation
  };

  return (
    <NavigationContext.Provider value={navigationContext}>{children}</NavigationContext.Provider>
  );
}

export { NavigationContext, NavigationContextProvider };
