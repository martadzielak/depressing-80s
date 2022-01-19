import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { ObjWithMtl } from "./Obj";
import {
  EffectComposer,
  Glitch,
  Pixelation,
} from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import roadImg from "./road.jpg";
import grassImg from "./grass.jpg";
import carMtl from "./car.mtl";
import carObj from "./car.obj";
import { useEffect } from "react/cjs/react.development";

const Model = ({ speedMode, everythingMode }) => {
  const [roadTexture, grassTexture] = useTexture([roadImg, grassImg]);
  const { ref } = useRef();
  const [carPositionY, setCarPositionY] = useState(1000);
  const [roadTextureOffset, setRoadTextureOffset] = useState(0);
  const [sunSize, setSunSize] = useState(60);
  const carPositionZ = everythingMode ? 15 : 0;
  const speed = speedMode ? 0.02 : 2;

  useFrame(() => {
    const minCarPosition = -150;
    if (carPositionY === minCarPosition) {
      setCarPositionY(1000);
    } else setCarPositionY(carPositionY - speed);

    setRoadTextureOffset(roadTextureOffset + 1);

    if (everythingMode) {
      if (sunSize <= 830) {
        setSunSize(sunSize + 1);
      }
    }
  });

  if (roadTexture) {
    roadTexture.matrixAutoUpdate = true;
    roadTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
    roadTexture.repeat.set(1, 30);
    roadTexture.anisotropy = 16;
  }

  if (grassTexture) {
    grassTexture.matrixAutoUpdate = true;
    grassTexture.wrapS = roadTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(1, 1200);
    grassTexture.anisotropy = 16;
  }

  return (
    <group ref={ref} position={[0, 0, 0]} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh position={[-5, 800, 145]}>
          <sphereBufferGeometry attach="geometry" args={[sunSize, 32, 32]} />
          <meshLambertMaterial
            attach="material"
            color="white"
            emissive="white"
            emissiveIntensity={1000}
          />
        </mesh>
        <ObjWithMtl
          name="car"
          mtlPath={carMtl}
          objPath={carObj}
          scale={3.5}
          position={[-5, carPositionY, carPositionZ]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh position={[0, carPositionY / 2, 0]}>
          <planeBufferGeometry attach="geometry" args={[30, 1200, 1]} />
          <meshStandardMaterial attach="material" map={roadTexture} />
        </mesh>
        <mesh position={[0, 0, -0.01]}>
          <planeBufferGeometry attach="geometry" args={[1200, 1200, 1]} />
          <meshStandardMaterial attach="material" map={grassTexture} />
        </mesh>
      </group>
    </group>
  );
};

export const Background = ({
  lightningMode,
  speedMode,
  glitchMode,
  colorsMode,
  everythingMode,
}) => {
  return (
    <Canvas
      style={colorsMode ? { filter: "invert(1)" } : undefined}
      camera={{ position: [3, 5.5, 20], fov: 80 }}
    >
      {lightningMode ? (
        <ambientLight />
      ) : (
        <pointLight position={[3, 5.5, 20]} />
      )}
      <fog attach="fog" args={["gray", 320, 3000]} />
      {/* <color attach="background" args={["#0B0B45"]} /> */}
      <Suspense fallback={null}>
        <Model speedMode={speedMode} everythingMode={everythingMode} />
      </Suspense>
      <EffectComposer>
        <Glitch
          mode={glitchMode ? GlitchMode.CONSTANT_WILD : GlitchMode.SPORADIC}
        />
        <Pixelation />
      </EffectComposer>
    </Canvas>
  );
};
