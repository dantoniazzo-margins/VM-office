import { useGLTF, OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { Physics } from '@react-three/rapier';
import { useEffect, useState, useRef } from 'react';
import { RapierRigidBody } from '@react-three/rapier';
import { Wall, WALL_HEIGHT, WALL_LENGTH, WALL_WIDTH } from '_entities/wall';
import { Ball } from '_entities/ball';
import {
  Floor,
  FLOOR_HEIGHT,
  FLOOR_LENGTH,
  FLOOR_WIDTH,
} from '_entities/floor';
import { Desk } from '_entities/desk';

export default function Office() {
  const [hitSound] = useState(() => new Audio('./hit.mp3'));
  const ball = useRef<RapierRigidBody | null>(null);

  const FORCE_POWER = 0.1;

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp':
          moveBall(0, 0, -FORCE_POWER);
          break;
        case 'ArrowDown':
          moveBall(0, 0, FORCE_POWER);
          break;
        case 'ArrowLeft':
          moveBall(-FORCE_POWER, 0, 0);
          break;
        case 'ArrowRight':
          moveBall(FORCE_POWER, 0, 0);
          break;
        case ' ':
          jump();
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      ball.current?.resetForces(true);
    });
  }, []);

  const moveBall = (x: number, y: number, z: number) => {
    ball.current?.resetForces(true);
    ball.current?.applyImpulse({ x, y, z }, true);
  };

  const jump = () => {
    moveBall(0, FORCE_POWER * 2, 0);
  };

  return (
    <>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Physics gravity={[0, -9.08, 0]}>
        <Ball ref={ball} />
        <Floor />

        {/* Boundary walls */}
        <Wall
          length={FLOOR_LENGTH}
          rotate
          position-x={-FLOOR_WIDTH / 2 + WALL_WIDTH / 2}
        />
        <Wall
          length={FLOOR_LENGTH}
          rotate
          position-x={FLOOR_WIDTH / 2 - WALL_WIDTH / 2}
          opacity={0.2}
        />
        <Wall
          length={FLOOR_WIDTH - 2 * WALL_WIDTH}
          position-z={-FLOOR_LENGTH / 2 + WALL_WIDTH / 2}
        />
        <Wall
          length={FLOOR_WIDTH - 2 * WALL_WIDTH - FLOOR_WIDTH / 3}
          position-z={FLOOR_LENGTH / 2 - WALL_WIDTH / 2}
          position-x={FLOOR_WIDTH / 3 / 2}
        />

        {/* Middle section */}
        <Wall
          length={FLOOR_WIDTH - 2 * WALL_WIDTH - FLOOR_WIDTH / 3}
          position-x={FLOOR_WIDTH / 3 / 2}
          position-z={-FLOOR_LENGTH / 2 + 0.1 / 2 + FLOOR_LENGTH / 3}
          opacity={0.4}
          width={0.1}
        />
        <Wall
          length={FLOOR_WIDTH - 2 * WALL_WIDTH - FLOOR_WIDTH / 3}
          position-x={FLOOR_WIDTH / 3 / 2}
          position-z={FLOOR_LENGTH / 2 - WALL_WIDTH / 2 - FLOOR_LENGTH / 3}
        />
        <Wall
          length={FLOOR_WIDTH - 2 * WALL_WIDTH - FLOOR_WIDTH / 3}
          position-x={FLOOR_WIDTH / 3 / 2}
        />
        <Wall
          length={FLOOR_LENGTH / 4}
          rotate
          position-x={-FLOOR_WIDTH / 3 / 2 + WALL_WIDTH / 2}
          position-z={
            -FLOOR_LENGTH / 2 + FLOOR_LENGTH / 3 + FLOOR_LENGTH / 4 / 2
          }
        />

        <Wall
          length={FLOOR_LENGTH / 4 / 3 - WALL_WIDTH}
          rotate
          position-x={-FLOOR_WIDTH / 3 / 2 + 0.1 * 2}
          position-z={
            FLOOR_LENGTH / 2 -
            FLOOR_LENGTH / 3 -
            FLOOR_LENGTH / 4 / 3 / 2 -
            WALL_WIDTH / 2
          }
          opacity={0.4}
          width={0.1}
        />
        <Desk position-z={2.75} position-x={3} rotation-y={Math.PI * 0.5} />
        <Desk position-z={2.75} position-x={1} rotation-y={Math.PI * 0.5} />
      </Physics>
    </>
  );
}
