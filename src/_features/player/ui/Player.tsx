import { useRapier, RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export const Player = () => {
  const body = useRef<RapierRigidBody | null>(null);
  const [_, getKeys] = useKeyboardControls();
  const { rapier, world } = useRapier();
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
      player.applyImpulse({ x: 0, y: 0.5, z: 0 }, true);
    }
  };

  const reset = () => {
    const player = getPlayer();
    if (!player) return;
    player.setTranslation({ x: -4, y: 1, z: 19.6 }, true);
    player.setLinvel({ x: 0, y: 0, z: 0 }, true);
    player.setAngvel({ x: 0, y: 0, z: 0 }, true);
  };

  useEffect(() => {
    reset();
  }, []);

  useFrame((state, delta) => {
    /**
     * Controls
     */

    const player = getPlayer();
    if (!player) return;

    const { forward, backward, leftward, rightward, jump } = getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

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

    /**
     * Camera
     */
    const bodyPosition = player.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 5.25;
    cameraPosition.y += 2.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

    state.camera.position.copy(smoothedCameraPosition);
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
      position={[0, 1, 0]}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.2, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
};
