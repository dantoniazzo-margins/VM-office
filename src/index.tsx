import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Office from "./Office";
import { KeyboardControls } from "@react-three/drei";
import ThirdPersonTest from "_pages/ThirdPersonTest/ThirdPersonTest";
import WalkingTest from "_pages/WalkingTest/WalkingTest";
import DrivingGame from "_pages/DrivingTest/DrivingTest";
import { RaceTrack } from "_pages/DrivingTest/Racetrack";
import * as THREE from "three";

const rootContainer = document.querySelector("#root");

if (rootContainer) {
  const root = ReactDOM.createRoot(rootContainer);

  root.render(
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "back", keys: ["ArrowDown", "KeyS"] },
        { name: "left", keys: ["ArrowLeft", "KeyA"] },
        { name: "right", keys: ["ArrowRight", "KeyD"] },
        { name: "brake", keys: ["Space"] },
        { name: "jump", keys: ["Space"] },
        { name: "shift", keys: ["Shift"] },
        { name: "reset", keys: ["KeyR"] },
      ]}
    >
      <Canvas shadows>
        <Office />
      </Canvas>
    </KeyboardControls>
    /* <DrivingGame /> */
    /*  <WalkingTest /> */
  );
}
