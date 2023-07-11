import { Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import fragment from "./shaders/fragment.glsl";
import Info from "./components/Info";

function App() {
  const [count, setCount] = useState(0);

  console.log(`${fragment}`);

  return (
    <div className="w-screen h-screen flex">
      <Info />

      <div className="w-screen h-screen absolute top-0 -z-10 bottom-0 ">
        <Canvas className="bg-red-300  relative ">
          <Suspense>
            <mesh>
              <ambientLight />
              <Plane args={[window.innerWidth, window.innerHeight]}>
                <shaderMaterial fragmentShader={fragment} />
              </Plane>
            </mesh>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default App;
