import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Office from "./Office";
import { KeyboardControls } from "@react-three/drei";

const rootContainer = document.querySelector("#root");

if (rootContainer) {
  const root = ReactDOM.createRoot(rootContainer);

  root.render(
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "flip", keys: ["KeyF"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.5,
          far: 200,
          position: [-4.5, 1, 25],
        }}
      >
        <Office />
      </Canvas>
    </KeyboardControls>
  );
}
