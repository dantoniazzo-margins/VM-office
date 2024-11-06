import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody, CapsuleCollider } from '@react-three/rapier';
import { KeyboardControls, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Character component with stable physics
const Character = () => {
  const characterRef = useRef();
  const modelRef = useRef();
  const rotationRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentVelocity = useRef({ x: 0, z: 0 });

  const MOVE_SPEED = 10;
  const DAMPING = 3; // Linear damping to prevent sliding
  const ROTATION_SPEED = 10;
  const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
  };

  // Handle key events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = true;
      }
    };

    const handleKeyUp = (e) => {
      if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!characterRef.current || !modelRef.current) return;

    // Calculate movement direction
    const moveDirection = new THREE.Vector3(0, 0, 0);
    if (keys.w) moveDirection.z -= 1;
    if (keys.s) moveDirection.z += 1;
    if (keys.a) moveDirection.x -= 1;
    if (keys.d) moveDirection.x += 1;

    // Only apply force if there's movement input
    if (moveDirection.length() > 0) {
      moveDirection.normalize();

      // Calculate target rotation based on movement direction
      const targetRotation = Math.atan2(moveDirection.x, moveDirection.z);

      // Smoothly rotate the model
      const currentRotation = modelRef.current.rotation.y;
      const newRotation = THREE.MathUtils.lerp(
        currentRotation,
        targetRotation,
        delta * ROTATION_SPEED
      );
      modelRef.current.rotation.y = newRotation;

      // Apply movement force
      const impulse = {
        x: moveDirection.x * MOVE_SPEED,
        y: 0,
        z: moveDirection.z * MOVE_SPEED,
      };

      // Get current velocity
      const linvel = characterRef.current.linvel();

      // Only apply impulse if not exceeding max speed
      if (Math.abs(linvel.x) < MOVE_SPEED && Math.abs(linvel.z) < MOVE_SPEED) {
        characterRef.current.applyImpulse(impulse);
      }
    }

    // Keep character upright
    characterRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 });

    // Update model position to match physics body
    const position = characterRef.current.translation();
    modelRef.current.position.x = position.x;
    modelRef.current.position.y = position.y - 1; // Adjust based on your model's center point
    modelRef.current.position.z = position.z;
  });

  return (
    <RigidBody
      ref={characterRef}
      lockRotations
      linearDamping={DAMPING}
      friction={0.5}
      position={[0, 2, 0]}
    >
      <CapsuleCollider args={[0.5, 0.3]} position={[0, 1, 0]} />
      <group ref={modelRef}>
        <mesh position={[0, 1, 0]}>
          <capsuleGeometry args={[0.3, 1]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        {/* Front indicator */}
        <mesh position={[0, 1, -0.2]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </group>
    </RigidBody>
  );
};

// Ground plane component
const Ground = () => {
  return (
    <RigidBody type="fixed">
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </RigidBody>
  );
};

// Main scene component
const WalkingTest = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        <Physics debug>
          <Character />
          <Ground />
        </Physics>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default WalkingTest;
