import { useRapier, RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const CAMERA_FROM_OBJECT_DISTANCE = 2;

export const Player = () => {
  const body = useRef<RapierRigidBody | null>(null);
  const [_, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
  const mouse = useRef<THREE.Vector2>(new THREE.Vector2());
  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );

  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
  const getPlayer = () => {
    return body.current;
  };
  const jumpUp = () => {
    const player = getPlayer();
    if (!player) return;
    const origin = player.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit && hit.timeOfImpact < 0.15) {
      player.applyImpulse({ x: 0, y: 0.1, z: 0 }, true);
    }
  };

  const reset = () => {
    const player = getPlayer();
    if (!player) return;
    player.setTranslation({ x: -4, y: 1, z: 19.6 }, true);
    player.setLinvel({ x: 0, y: 0, z: 0 }, true);
    player.setAngvel({ x: 0, y: 0, z: 0 }, true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    mouse.current.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / innerHeight) * 2 + 1;
  };

  useEffect(() => {
    reset();

    window.addEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    const player = getPlayer();
    if (!player) return;

    const { forward, backward, leftward, rightward, jump, flip } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.1 * delta;
    const torqueStrength = 0.1 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    if (jump) {
      jumpUp();
    }

    player.applyImpulse(impulse, true);
    player.applyTorqueImpulse(torque, true);

    const bodyPosition = player.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);

    cameraPosition.x -= CAMERA_FROM_OBJECT_DISTANCE * mouse.current.x;
    cameraPosition.y -= CAMERA_FROM_OBJECT_DISTANCE * mouse.current.y;
    cameraPosition.z +=
      CAMERA_FROM_OBJECT_DISTANCE * (1 - Math.abs(mouse.current.x));

    1;

    cameraPosition.y += 0.5;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
    /*  state.camera.rotation.set(Math.PI * mouse.current.y, 0, 0); */
    state.camera.lookAt(smoothedCameraTarget);
  });

  return (
    <RigidBody
      ref={body}
      canSleep={false}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      mass={3}
      position={[0, 1, 0]}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.2, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
};
