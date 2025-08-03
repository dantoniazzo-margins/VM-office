import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '_shared/ui';
import Office from './Office';
import { KeyboardControls } from '@react-three/drei';
import ThirdPersonTest from '_pages/ThirdPersonTest/ThirdPersonTest';
import WalkingTest from '_pages/WalkingTest/WalkingTest';
import DrivingGame from '_pages/DrivingTest/DrivingTest';
import { RaceTrack } from '_pages/DrivingTest/Racetrack';
import * as THREE from 'three';
import { keys } from '_features/controls';

const rootContainer = document.querySelector('#root');
const keyboardControls = Object.values(keys).map((value) => value);
if (rootContainer) {
  const root = ReactDOM.createRoot(rootContainer);

  root.render(
    <KeyboardControls map={keyboardControls}>
      <Canvas shadows>
        <Office />
      </Canvas>
    </KeyboardControls>
  );
}
