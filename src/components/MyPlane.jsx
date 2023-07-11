import { Canvas, useFrame, useThree } from "@react-three/fiber";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";

import { Plane, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";

let MyPlane = () => {
  let time = 100;

  let clock = useThree();

  const uniformsRef = useRef({
    image: { value: useTexture("../public/trails.jpg") },
    u_time: { value: 0 },
  });

  // let uniforms = {
  //   image: { value: useTexture("../public/trails.jpg") },
  //   u_time: {
  //     value: 0,
  //   },
  // };

  let state = useThree();

  console.log(state.size);

  let sm = Math.max(state.size.width, state.size.height);
  useFrame(({ clock }) => {
    uniformsRef.current.u_time.value = clock.elapsedTime;
  });

  return (
    <mesh>
      <ambientLight />
      <Plane args={[sm * 0.02, sm * 0.02]}>
        <shaderMaterial
          uniforms={uniformsRef.current}
          vertexShader={vertex}
          fragmentShader={fragment}
        />
      </Plane>
    </mesh>
  );
};

export default MyPlane;
