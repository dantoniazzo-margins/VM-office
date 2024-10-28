import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

const useMouseControls = () => {
  const [mouseState, setMouseState] = useState({
    isLeftMouseDown: false,
    isRightMouseDown: false,
    lastX: 0,
    lastY: 0,
    movementX: 0,
    movementY: 0,
  });

  useEffect(() => {
    const handleMouseDown = (e) => {
      // e.button: 0 = left, 2 = right
      setMouseState((prev) => ({
        ...prev,
        isLeftMouseDown: e.button === 0 ? true : prev.isLeftMouseDown,
        isRightMouseDown: e.button === 2 ? true : prev.isRightMouseDown,
        lastX: e.clientX,
        lastY: e.clientY,
      }));
    };

    const handleMouseUp = (e) => {
      setMouseState((prev) => ({
        ...prev,
        isLeftMouseDown: e.button === 0 ? false : prev.isLeftMouseDown,
        isRightMouseDown: e.button === 2 ? false : prev.isRightMouseDown,
      }));
    };

    const handleMouseMove = (e) => {
      if (document.pointerLockElement) {
        setMouseState((prev) => ({
          ...prev,
          movementX: e.movementX,
          movementY: e.movementY,
        }));
      } else if (mouseState.isRightMouseDown) {
        // Calculate movement for orbital rotation
        setMouseState((prev) => ({
          ...prev,
          movementX: e.clientX - prev.lastX,
          movementY: e.clientY - prev.lastY,
          lastX: e.clientX,
          lastY: e.clientY,
        }));
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault(); // Prevent context menu from appearing
    };

    const handlePointerLockChange = () => {
      if (!document.pointerLockElement) {
        setMouseState((prev) => ({
          ...prev,
          isLeftMouseDown: false,
          movementX: 0,
          movementY: 0,
        }));
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
    };
  }, [mouseState.isRightMouseDown]);

  return mouseState;
};

// Custom hook for loading FBX models
const useFBX = (path) => {
  const [model, setModel] = useState(null);
  const [animations, setAnimations] = useState({});
  const [mixer, setMixer] = useState(null);
  const loader = new FBXLoader();

  useEffect(() => {
    loader.load(path, (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse((c) => {
        c.castShadow = true;
      });
      setModel(fbx);
      const newMixer = new THREE.AnimationMixer(fbx);
      setMixer(newMixer);
    });
  }, [path]);

  const loadAnimation = (name, url) => {
    loader.load(url, (anim) => {
      const clip = anim.animations[0];
      const action = mixer.clipAction(clip);
      setAnimations((prev) => ({
        ...prev,
        [name]: { clip, action },
      }));
    });
  };

  return { model, animations, mixer, loadAnimation };
};

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

  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }

    if (group.current) {
      const speed = keys.shift ? 40 : 30;

      // Get camera's forward and right directions
      const cameraForward = new THREE.Vector3();
      camera.getWorldDirection(cameraForward);
      cameraForward.y = 0;
      cameraForward.normalize();

      const cameraRight = new THREE.Vector3(
        cameraForward.z,
        0,
        -cameraForward.x
      );

      // Calculate movement direction
      const moveDir = new THREE.Vector3(0, 0, 0);

      if (keys.forward) moveDir.add(cameraForward);
      if (keys.backward) moveDir.sub(cameraForward);
      if (keys.right) moveDir.add(cameraRight);
      if (keys.left) moveDir.sub(cameraRight);

      if (moveDir.lengthSq() > 0) {
        moveDir.normalize();

        // Move character
        group.current.position.x += moveDir.x * speed * delta;
        group.current.position.z += moveDir.z * speed * delta;

        // Rotate character to face movement direction
        const angle = Math.atan2(moveDir.x, moveDir.z);
        const rotationSpeed = 15;

        // Get current rotation and normalize it
        let currentRotation = group.current.rotation.y % (2 * Math.PI);
        if (currentRotation < 0) currentRotation += 2 * Math.PI;

        // Calculate shortest rotation path
        let rotationDiff = angle - currentRotation;
        if (rotationDiff > Math.PI) rotationDiff -= 2 * Math.PI;
        if (rotationDiff < -Math.PI) rotationDiff += 2 * Math.PI;

        // Apply smooth rotation
        group.current.rotation.y += rotationDiff * rotationSpeed * delta;
      }
    }
  });

  React.useImperativeHandle(ref, () => group.current);

  if (!model) return null;

  return (
    <group ref={group} position={position} rotation={rotation}>
      <primitive object={model} />
    </group>
  );
});

// Updated ThirdPersonCamera Component
const ThirdPersonCamera = ({ target }) => {
  const { camera } = useThree();
  const mouseControls = useMouseControls();

  const cameraState = useRef({
    distance: 35,
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
    const handleWheel = (e) => {
      if (!mouseControls.isRightMouseDown) {
        // Only zoom when not orbiting
        cameraState.current.distance = THREE.MathUtils.clamp(
          cameraState.current.distance +
            e.deltaY * 0.01 * cameraState.current.zoomSpeed,
          10,
          50
        );
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [mouseControls.isRightMouseDown]);

  useFrame((state, delta) => {
    if (!target.current) return;

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
      cameraState.current.horizontalAngle +=
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
        mouseControls.movementX * mouseSensitivity;
      const targetVerticalVelocity =
        -mouseControls.movementY * mouseSensitivity;

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
      target.current.position.x + distance * Math.sin(theta) * Math.cos(phi),
      target.current.position.y + distance * Math.sin(phi),
      target.current.position.z + distance * Math.cos(theta) * Math.cos(phi)
    );

    camera.position.lerp(targetPosition, 1 - smoothingFactor);

    // Look at target with offset
    const lookAtPosition = new THREE.Vector3(
      target.current.position.x,
      target.current.position.y + 10,
      target.current.position.z
    );

    camera.lookAt(lookAtPosition);
  });

  return null;
};

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
