import "./App.css";
import { Background } from "./Background/Background";
import { Overlay } from "./Overlay/Overlay";
import { useEffect, useState } from "react";
import depressing80s from "./depressing80s.mp3";
import { AppContainer } from "./styled";

let audio = new Audio(depressing80s);

export const App = () => {
  const [lightningCrazyMode, setLightningCrazyMode] = useState(false);
  const [speedCrazyMode, setSpeedCrazyMode] = useState(false);
  const [glitchCrazyMode, setGlitchCrazyMode] = useState(false);
  const [colorsCrazyMode, setColorsCrazyMode] = useState(false);
  const [everythingCrazyMode, setEverythingCrazyMode] = useState(false);
  const [audioOn, setAudioOn] = useState(false);

  useEffect(() => {
    if (audioOn) audio.play();
    if (!audioOn) audio.pause();
  }, [audioOn]);

  return (
    <AppContainer>
      <Background
        lightningMode={lightningCrazyMode}
        speedMode={speedCrazyMode}
        glitchMode={glitchCrazyMode}
        colorsMode={colorsCrazyMode}
        everythingMode={everythingCrazyMode}
      />
      <Overlay
        handleAudio={() => setAudioOn(!audioOn)}
        handleLightning={() => setLightningCrazyMode(true)}
        handleSpeed={() => setSpeedCrazyMode(true)}
        handleGlitch={() => setGlitchCrazyMode(true)}
        handleColors={() => setColorsCrazyMode(true)}
        handleEverything={() => {
          setLightningCrazyMode(true);
          setSpeedCrazyMode(true);
          setGlitchCrazyMode(true);
          setColorsCrazyMode(true);
          setEverythingCrazyMode(true);
        }}
      />
    </AppContainer>
  );
};
