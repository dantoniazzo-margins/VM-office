import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// Character State Machine
const CharacterState = {
  IDLE: "idle",
  WALK: "walk",
  RUN: "run",
  DANCE: "dance",
};

// Input Controller Hook
const useKeyboardControls = () => {
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    space: false,
    shift: false,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      const keyMap = {
        KeyW: "forward",
        KeyS: "backward",
        KeyA: "left",
        KeyD: "right",
        Space: "space",
        ShiftLeft: "shift",
      };
      if (keyMap[e.code]) {
        setKeys((prev) => ({ ...prev, [keyMap[e.code]]: true }));
      }
    };

    const handleKeyUp = (e) => {
      const keyMap = {
        KeyW: "forward",
        KeyS: "backward",
        KeyA: "left",
        KeyD: "right",
        Space: "space",
        ShiftLeft: "shift",
      };
      if (keyMap[e.code]) {
        setKeys((prev) => ({ ...prev, [keyMap[e.code]]: false }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return keys;
};

// Character Model Component
const CharacterModel = React.forwardRef(({ position, rotation }, ref) => {
  const group = useRef();
  const { model, animations, mixer, loadAnimation } = useFBX(
    "/resources/zombie/mremireh_o_desbiens.fbx"
  );
  const [currentAnimation, setCurrentAnimation] = useState(CharacterState.IDLE);
  const keys = useKeyboardControls();
  const { camera } = useThree();

  // Load animations
  useEffect(() => {
    if (mixer) {
      loadAnimation("idle", "/resources/zombie/idle.fbx");
      loadAnimation("walk", "/resources/zombie/walk.fbx");
      loadAnimation("run", "/resources/zombie/run.fbx");
      loadAnimation("dance", "/resources/zombie/dance.fbx");
    }
  }, [mixer, loadAnimation]);

  // Handle animation state changes
  useEffect(() => {
    if (!mixer || !animations[currentAnimation]) return;

    let newState = CharacterState.IDLE;

    if (keys.forward || keys.backward || keys.left || keys.right) {
      newState = keys.shift ? CharacterState.RUN : CharacterState.WALK;
    } else if (keys.space) {
      newState = CharacterState.DANCE;
    }

    if (newState !== currentAnimation && animations[newState]) {
      const prevAction = animations[currentAnimation]?.action;
      const nextAction = animations[newState]?.action;

      if (prevAction && nextAction) {
        prevAction.fadeOut(0.5);
        nextAction.reset().fadeIn(0.5).play();
      }

      setCurrentAnimation(newState);
    }
  }, [keys, animations, currentAnimation, mixer]);

  React.useImperativeHandle(ref, () => group.current);

  if (!model) return null;

  return (
    <group ref={group} position={position} rotation={rotation}>
      <primitive object={model} />
    </group>
  );
});

// Environment Setup Component
const Environment = () => {
  const { scene } = useThree();

  useEffect(() => {
    // Setup environment map
    const loader = new THREE.CubeTextureLoader();
    loader.load(
      [
        "./resources/posx.jpg",
        "./resources/negx.jpg",
        "./resources/posy.jpg",
        "./resources/negy.jpg",
        "./resources/posz.jpg",
        "./resources/negz.jpg",
      ],
      (texture) => {
        texture.encoding = THREE.sRGBEncoding;
        scene.background = texture;
      }
    );
  }, [scene]);

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[-100, 100, 100]}
        intensity={1}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadow-camera-left={50}
        shadow-camera-right={-50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100, 10, 10]} />
        <meshStandardMaterial color={0x808080} />
      </mesh>
    </>
  );
};

// Loading Screen Component
const LoadingScreen = () => {
  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="white" />
      <textMesh position={[0, 0, 0.1]} fontSize={0.1}>
        Loading...
      </textMesh>
    </mesh>
  );
};

// Main App Component
const App = () => {
  const characterRef = useRef();

  return (
    <Canvas
      shadows
      gl={{ antialias: true }}
      camera={{ fov: 60, near: 1.0, far: 1000.0 }}
      style={{ cursor: "pointer" }}
    >
      <Suspense fallback={<LoadingScreen />}>
        <Environment />
        <CharacterModel
          ref={characterRef}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        />
        <ThirdPersonCamera target={characterRef} />
      </Suspense>
    </Canvas>
  );
};

export default App;
