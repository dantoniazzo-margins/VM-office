import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ThirdPersonCameraProps } from './third-person.camera';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import { useRapier } from '@react-three/rapier';
import { useEffect } from 'react';
import { INITIAL_POSITION } from '../lib/constants';

export const usePlayerMovement = ({ target }: ThirdPersonCameraProps) => {
  const [_, getKeys] = useKeyboardControls();

  const { rapier, world } = useRapier();

  const reset = () => {
    if (!target) return;
    target.setTranslation(INITIAL_POSITION, true);
    target.setLinvel({ x: 0, y: 0, z: 0 }, true);
    target.setAngvel({ x: 0, y: 0, z: 0 }, true);
  };

  useEffect(() => {
    reset();
  }, []);

  const jumpUp = () => {
    if (!target) return;
    const origin = target.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };
    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit && hit.timeOfImpact < 0.1) {
      target.applyImpulse({ x: 0, y: 0.03, z: 0 }, true);
    }
  };

  useFrame((state, delta) => {
    if (!target) return;
    const _keys = getKeys();
    const speed = _keys.shift ? 2 : 1;

    // Get camera's forward and right directions
    const cameraForward = new THREE.Vector3();
    state.camera.getWorldDirection(cameraForward);
    cameraForward.y = 0;
    cameraForward.normalize();

    const cameraRight = new THREE.Vector3(cameraForward.z, 0, -cameraForward.x);

    // Calculate movement direction
    const moveDir = new THREE.Vector3(0, 0, 0);

    if (_keys.forward) moveDir.add(cameraForward);
    if (_keys.backward) moveDir.sub(cameraForward);
    if (_keys.rightward) moveDir.sub(cameraRight);
    if (_keys.leftward) moveDir.add(cameraRight);
    if (_keys.jump) jumpUp();
    if (_keys.reset) reset();

    if (moveDir.lengthSq() > 0) {
      moveDir.normalize();

      const newPosition = {
        x: moveDir.x * speed * delta,
        y: 0,
        z: moveDir.z * speed * delta,
      };
      // Move character
      target.applyImpulse(newPosition, true);
      // Rotate character to face movement direction
      const angle = Math.atan2(moveDir.x, moveDir.z);
      const rotationSpeed = 15;
    }
  });
};
