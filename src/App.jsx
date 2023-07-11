import * as THREE from "three";
import { OrbitControls, Plane, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import Info from "./components/Info";
import img from "../public/trails.jpg";
import MyPlane from "./components/MyPlane";

function App() {
  let canvas = useRef(null);

  useEffect(() => {
    // canvas.cu

    let sq = Math.max(window.innerWidth, window.innerHeight);
    // canvas.current.width = sq;
    // canvas.current.height = sq;

    // canvas.current.style.width = sq + "px";
    // canvas.current.style.height = sq + "px";
  });
  return (
    <div className="w-screen h-screen flex">
      <Info />
      {/* top-0.5 left-0.5 translate-x-0.5 translate-y-0.5 */}
      <div className="fixed top-0 left-0 bottom-0 right-0 -z-10">
        <Suspense>
          <Canvas
            ref={canvas}
            className="bg-red-300  relative  border-gray-600"
          >
            <MyPlane />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
