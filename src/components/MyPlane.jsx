import { Canvas, useFrame, useThree } from "@react-three/fiber";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";

import { Plane, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";

let MyPlane = () => {
  let time = 100;

  let state = useThree();

  const uniformsRef = useRef({
    image: { value: useTexture("../public/trails.jpg") },
    u_time: { value: 0 },
    u_resolution: {
      value: state.size.width * state.size.height,
      x: state.size.width,
      y: state.size.height,
    },
    u_mouse: { value: { x: 0.24, y: 1 } },
  });

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    const mouse = {
      x: (clientX / innerWidth) * 2 - 1,
      y: -(clientY / innerHeight) * 2 + 1,
    };
    uniformsRef.current.u_mouse.value = mouse;
  };

  useEffect(() => {
    window.addEventListener("pointermove", handleMouseMove);

    window.removeEventListener("pointermove", handleMouseMove);
  }, []);

  let sm = Math.max(state.size.width, state.size.height);
  useFrame(({ clock, scene, pointer }) => {
    uniformsRef.current.u_time.value = clock.elapsedTime;
    uniformsRef.current.u_mouse.value = pointer;
    // console.log("Pointer: ", pointer);
    // console.log(uniformsRef.current.u_mouse.value.x);
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
