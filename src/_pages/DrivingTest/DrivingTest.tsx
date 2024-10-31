import { Canvas } from '@react-three/fiber';
import { RigidBody, Physics } from '@react-three/rapier';
import {
  KeyboardControls,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import { ThreeCar } from '_entities/car';

function Scene() {
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[0, 5, 10]} />
      <OrbitControls />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} castShadow />

      <Physics debug gravity={[0, -9.81, 0]}>
        <ThreeCar />
        <RigidBody type="fixed">
          <mesh receiveShadow position={[0, -2, 0]}>
            <boxGeometry args={[200, 1, 200]} />
            <meshStandardMaterial color="green" />
          </mesh>
        </RigidBody>
      </Physics>
    </Canvas>
  );
}

export default function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
          { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
          { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
          { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
          { name: 'flip', keys: ['KeyF'] },
          { name: 'shift', keys: ['Shift'] },
          { name: 'jump', keys: ['Space'] },
          { name: 'reset', keys: ['KeyR'] },
        ]}
      >
        <Scene />
      </KeyboardControls>
    </div>
  );
}
