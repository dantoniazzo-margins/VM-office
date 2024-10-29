import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import { useMouseControls } from "_features/mouse";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface ThirdPersonCameraProps {
  target: RapierRigidBody | null;
}
export const useThirdPersonCamera = ({ target }: ThirdPersonCameraProps) => {
  const mouseControls = useMouseControls();

  const cameraState = useRef({
    distance: 5,
    horizontalAngle: 0,
    verticalAngle: 0.5,
    // Add smoothing parameters
    currentHorizontalVelocity: 0,
    currentVerticalVelocity: 0,
    // Configuration
    mouseSensitivity: 0.002,
    orbitSensitivity: 0.005, // Sensitivity for orbital rotation
    smoothingFactor: 0.85,
    maxVerticalAngle: 1.5,
    minVerticalAngle: 0.1,
    zoomSpeed: 0.5,
  });

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!mouseControls.isRightMouseDown) {
        // Only zoom when not orbiting
        cameraState.current.distance = THREE.MathUtils.clamp(
          cameraState.current.distance +
            e.deltaY * 0.01 * cameraState.current.zoomSpeed,
          2,
          20
        );
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [mouseControls.isRightMouseDown]);

  useEffect(() => {
    // Lock pointer on click
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.onclick = () => canvas.requestPointerLock();
    }
  }, []);

  useFrame((state, delta) => {
    if (!target) return;

    const {
      mouseSensitivity,
      orbitSensitivity,
      smoothingFactor,
      maxVerticalAngle,
      minVerticalAngle,
    } = cameraState.current;

    // Handle camera rotation based on mouse state
    if (mouseControls.isRightMouseDown) {
      // Orbital rotation (right mouse button)
      cameraState.current.horizontalAngle -=
        mouseControls.movementX * orbitSensitivity;
      cameraState.current.verticalAngle = THREE.MathUtils.clamp(
        cameraState.current.verticalAngle +
          mouseControls.movementY * orbitSensitivity,
        minVerticalAngle,
        maxVerticalAngle
      );
    } else if (document.pointerLockElement) {
      // First person looking (pointer lock)
      // Calculate new velocities
      const targetHorizontalVelocity =
        -mouseControls.movementX * mouseSensitivity;
      const targetVerticalVelocity = mouseControls.movementY * mouseSensitivity;

      // Smooth the velocities
      cameraState.current.currentHorizontalVelocity = THREE.MathUtils.lerp(
        cameraState.current.currentHorizontalVelocity,
        targetHorizontalVelocity,
        1 - smoothingFactor
      );

      cameraState.current.currentVerticalVelocity = THREE.MathUtils.lerp(
        cameraState.current.currentVerticalVelocity,
        targetVerticalVelocity,
        1 - smoothingFactor
      );

      // Apply the smoothed velocities
      cameraState.current.horizontalAngle +=
        cameraState.current.currentHorizontalVelocity;
      cameraState.current.verticalAngle = THREE.MathUtils.clamp(
        cameraState.current.verticalAngle +
          cameraState.current.currentVerticalVelocity,
        minVerticalAngle,
        maxVerticalAngle
      );
    } else {
      // Gradually reduce velocities when neither control is active
      cameraState.current.currentHorizontalVelocity *= smoothingFactor;
      cameraState.current.currentVerticalVelocity *= smoothingFactor;
    }

    // Calculate camera position using spherical coordinates
    const theta = cameraState.current.horizontalAngle;
    const phi = cameraState.current.verticalAngle;
    const distance = cameraState.current.distance;

    // Smoothly interpolate camera position
    const targetPosition = new THREE.Vector3(
      target.translation().x + distance * Math.sin(theta) * Math.cos(phi),
      target.translation().y + distance * Math.sin(phi),
      target.translation().z + distance * Math.cos(theta) * Math.cos(phi)
    );

    state.camera.position.lerp(targetPosition, 1 - smoothingFactor);

    // Look at target with offset
    const lookAtPosition = new THREE.Vector3(
      target.translation().x,
      target.translation().y + 1,
      target.translation().z
    );

    state.camera.lookAt(lookAtPosition);
  });

  return null;
};
