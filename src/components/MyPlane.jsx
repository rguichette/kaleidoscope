import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import fragment from "../shaders/fragment.glsl";
import vertex from "../shaders/vertex.glsl";

import { Plane, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { TextureLoader } from "three";

let files = ["flowers.jpg", "light.jpg"];
let img = `../public/${files[0]}`;

// window.onclick = (e) => {
//   if (trace == 2) {
//     trace = 0;
//   }

//   img = `..public/${files[trace]}`;
//   console.log(img);
//   trace++;
// };

let handleImageLoad = () => {
  console.log("clicked");
  img = `../public/${files[1]}`;
};

let MyPlane = () => {
  let state = useThree();
  let textures = useLoader(TextureLoader, [
    "../public/trails.jpg",
    "../public/flowers.jpg",
    "../public/light.jpg",
  ]);
  let trace = 0;
  let loadedImg = textures[trace];

  window.addEventListener("click", () => {
    trace++;
    if (trace == 3) {
      trace = 0;
    }
    loadedImg = textures[trace];

    uniformsRef.current.image.value = loadedImg;
  });
  const uniformsRef = useRef({
    image: { value: loadedImg },
    u_time: { value: 0 },
    u_resolution: {
      value: state.size.width * state.size.height,
      x: state.size.width,
      y: state.size.height,
    },
    u_mouse: { value: { x: 0.24, y: 1 } },
  });
  // console.log("CLICKED FOR!!");
  let sm = Math.max(state.size.width, state.size.height);
  useFrame(({ clock, scene, pointer }) => {
    uniformsRef.current.u_time.value = clock.elapsedTime;
    uniformsRef.current.u_mouse.value = pointer;
    // uniformsRef.current.image.value = img;
    // console.log("TRACE: ", trace);
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
