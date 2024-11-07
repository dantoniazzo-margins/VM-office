import { useFrame } from "@react-three/fiber";
import { ThirdPersonCameraProps } from "./third-person.camera";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { useRapier } from "@react-three/rapier";
import { useEffect } from "react";
import { INITIAL_POSITION } from "../lib/constants";

export const usePersonMovement = ({ target }: ThirdPersonCameraProps) => {
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
    const translation = target.translation();
    if (translation.y < 0.1) {
      target.applyImpulse({ x: 0, y: 0.4, z: 0 }, true);
    }
  };

  useFrame((state, delta) => {
    if (!target) return;
    const _keys = getKeys();
    const speed = _keys.shift ? 10 : 5;

    // Get camera's forward and right directions
    const cameraForward = new THREE.Vector3();
    state.camera.getWorldDirection(cameraForward);
    cameraForward.y = 0;
    cameraForward.normalize();

    const cameraRight = new THREE.Vector3(cameraForward.z, 0, -cameraForward.x);

    // Calculate movement direction
    const moveDir = new THREE.Vector3(0, 0, 0);
    if (_keys.forward) moveDir.add(cameraForward);
    if (_keys.back) moveDir.sub(cameraForward);
    if (_keys.right) moveDir.sub(cameraRight);
    if (_keys.left) moveDir.add(cameraRight);
    if (_keys.jump) jumpUp();
    if (_keys.reset) reset();

    if (moveDir.lengthSq() > 0) {
      moveDir.normalize();

      const currentPosition = target.translation();

      const newPosition = {
        x: moveDir.x * speed * delta,
        y: 0,
        z: moveDir.z * speed * delta,
      }; /* {
        x: currentPosition.x + moveDir.x * speed * delta,
        y: currentPosition.y,
        z: currentPosition.z + moveDir.z * speed * delta,
      }; */
      // Move character
      target.applyImpulse(newPosition, true);

      // Calculate target rotation angle based on movement direction
      const targetAngle = Math.atan2(moveDir.x, moveDir.z);

      // Interpolate towards target angle using quaternions for smooth rotation
      const targetQuaternion = new THREE.Quaternion();
      targetQuaternion.setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        targetAngle
      );

      // Retrieve the current rotation as a quaternion
      const currentQuaternion = new THREE.Quaternion();
      const currentRotation = target.rotation();
      currentQuaternion.set(
        currentRotation.x,
        currentRotation.y,
        currentRotation.z,
        currentRotation.w
      );

      // Smoothly interpolate rotation with quaternion slerp
      currentQuaternion.slerp(targetQuaternion, 10 * delta); // 10 * delta adjusts rotation speed

      // Apply the new rotation to the target
      target.setRotation(currentQuaternion, true);
    }
  });
};
