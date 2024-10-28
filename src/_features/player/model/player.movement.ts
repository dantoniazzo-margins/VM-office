import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ThirdPersonCameraProps } from "./third-person.camera";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { useRapier } from "@react-three/rapier";

export const usePlayerMovement = ({ target }: ThirdPersonCameraProps) => {
  const [_, getKeys] = useKeyboardControls();

  const { rapier, world } = useRapier();

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
    const { forward, backward, leftward, rightward, jump, shift } = getKeys();
    const speed = shift ? 0.3 : 0.15;

    // Get camera's forward and right directions
    const cameraForward = new THREE.Vector3();
    state.camera.getWorldDirection(cameraForward);
    cameraForward.y = 0;
    cameraForward.normalize();

    const cameraRight = new THREE.Vector3(cameraForward.z, 0, -cameraForward.x);

    // Calculate movement direction
    const moveDir = new THREE.Vector3(0, 0, 0);

    if (forward) moveDir.add(cameraForward);
    if (backward) moveDir.sub(cameraForward);
    if (rightward) moveDir.sub(cameraRight);
    if (leftward) moveDir.add(cameraRight);
    if (jump) jumpUp();

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
      } */
      // Move character
      target.applyImpulse(newPosition, true);
      // Rotate character to face movement direction
      const angle = Math.atan2(moveDir.x, moveDir.z);
      const rotationSpeed = 15;

      // Get current rotation and normalize it
      const currentRotation = {
        ...target.rotation(),
        y: target.rotation().y % (2 * Math.PI),
      };
      if (currentRotation && currentRotation.y < 0)
        currentRotation.y += 2 * Math.PI;

      // Calculate shortest rotation path
      let rotationDiff = angle - target.rotation().y;
      if (rotationDiff > Math.PI) rotationDiff -= 2 * Math.PI;
      if (rotationDiff < -Math.PI) rotationDiff += 2 * Math.PI;

      // Apply smooth rotation
      target.setRotation(
        {
          ...target.rotation(),
          y: target.rotation().y + rotationDiff * rotationSpeed * delta,
        },
        true
      );
    }
  });
};
