import { useGLTF } from "@react-three/drei";
import { RigidBody, RigidBodyProps } from "@react-three/rapier";
import { RIGHT_WALL_HEIGHT } from "_widgets/BoundingWalls";
import { useMemo } from "react";

export const WINDOW_WIDTH = 1.35;

export const Window = (props: RigidBodyProps) => {
  const window = useGLTF("/window.glb");
  // Clone the scene to be able to use multiple instances.
  const scene = useMemo(() => window.scene.clone(), [window]);
  return (
    <RigidBody
      position-y={RIGHT_WALL_HEIGHT - 0.22}
      scale={0.0072}
      {...props}
      colliders="cuboid"
      type="fixed"
      restitution={0}
      friction={0.7}
    >
      <primitive object={scene} castShadow />
    </RigidBody>
  );
};
