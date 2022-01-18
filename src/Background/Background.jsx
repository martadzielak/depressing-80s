import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture, shaderMaterial } from "@react-three/drei";
import { ObjWithMtl } from "./Obj";
import glsl from "babel-plugin-glsl/macro";
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

const HaloMaterial = shaderMaterial(
  {},
  // vertex shader
  glsl`
  varying vec3 vNormal;
  void main() 
  {
      vNormal = normalize( normalMatrix * normal );
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `,
  // fragment shader
  glsl`
  varying vec3 vNormal;
  void main() 
  {
      float intensity = pow( 0.3 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) ), 4.0 ); 
      gl_FragColor = vec4( 0.3, 0.4, 0.5, 1.0 ) * intensity;
  }
  `
);

extend({ HaloMaterial });

const Model = ({ speed, everything }) => {
  const [roadTexture, grassTexture] = useTexture([roadImg, grassImg]);
  const { ref } = useRef();
  const [carPositionY, setCarPositionY] = useState(1000);
  const [roadTextureOffset, setRoadTextureOffset] = useState(0);
  const carPositionZ = everything ? 15 : 0;
  const animationSpeed = speed ? 0.02 : 2;

  useFrame(() => {
    const minCarPosition = -150;
    if (carPositionY === minCarPosition) {
      setCarPositionY(1000);
    } else setCarPositionY(carPositionY - animationSpeed);

    setRoadTextureOffset(roadTextureOffset + 1);
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
          <sphereBufferGeometry attach="geometry" args={[60, 32, 32]} />
          <meshLambertMaterial
            attach="material"
            color="white"
            emissive="white"
            emissiveIntensity={1000}
          />
        </mesh>
        <mesh position={[5, 900, 190]}>
          <sphereBufferGeometry attach="geometry" args={[120, 32, 32]} />
          <haloMaterial
            attach="material"
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
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
  lightning,
  speed,
  glitch,
  colors,
  everything,
}) => {
  return (
    <Canvas
      style={colors ? { filter: "invert(1)" } : undefined}
      camera={{ position: [3, 5.5, 20], fov: 80 }}
    >
      {lightning ? <ambientLight /> : <pointLight position={[3, 5.5, 20]} />}
      <fog attach="fog" args={["gray", 320, 3000]} />
      <color attach="background" args={["#0B0B45"]} />
      <Suspense fallback={null}>
        <Model speed={speed} everything={everything} />
      </Suspense>
      <EffectComposer>
        <Glitch
          mode={glitch ? GlitchMode.CONSTANT_WILD : GlitchMode.SPORADIC}
        />
        <Pixelation />
      </EffectComposer>
    </Canvas>
  );
};
