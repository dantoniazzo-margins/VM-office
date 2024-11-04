import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Office from './Office';
import { KeyboardControls } from '@react-three/drei';
import ThirdPersonTest from '_pages/ThirdPersonTest/ThirdPersonTest';
import WalkingTest from '_pages/WalkingTest/WalkingTest';
import DrivingGame from '_pages/DrivingTest/DrivingTest';
import { RaceTrack } from '_pages/DrivingTest/Racetrack';

const rootContainer = document.querySelector('#root');

if (rootContainer) {
  const root = ReactDOM.createRoot(rootContainer);

  root.render(
    /* <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "flip", keys: ["KeyF"] },
        { name: "shift", keys: ["Shift"] },
        { name: "jump", keys: ["Space"] },
        { name: "reset", keys: ["KeyR"] },
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
    </KeyboardControls> */
    /* <DrivingGame /> */
    <RaceTrack />
    /*  <WalkingTest /> */
  );
}
