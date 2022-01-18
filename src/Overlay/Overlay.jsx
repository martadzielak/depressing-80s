import { useState } from "react";
import { Content, OverlayContainer, Toggle } from "./styled";
import volume from "./volume.png";

export const Overlay = ({
  handleLightning,
  handleAudio,
  handleSpeed,
  handleGlitch,
  handleColors,
  handleEverything,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <OverlayContainer visible={visible}>
      <Toggle onClick={() => setVisible(!visible)} />
      <Content>
        <p onClick={handleAudio}>
          <img src={volume} /> Please enjoy the music that I prepared for you
        </p>
        Hello, I'm Marta Dziełak. This is my project. I created this project
        with great care. It is supposed to help you chill out. Now, you can fuck
        something up with one click! There's no way back.
        <p onClick={handleLightning}> Fuck up the lightning </p>
        <p onClick={handleSpeed}> Fuck up the speed </p>
        <p onClick={handleGlitch}> Fuck up the glitch effect </p>
        <p onClick={handleColors}> Fuck up the colors </p>
        <p onClick={handleEverything}> Fuck everything up</p>
      </Content>
    </OverlayContainer>
  );
};
