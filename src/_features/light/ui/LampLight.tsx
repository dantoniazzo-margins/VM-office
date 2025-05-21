import {
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import { forwardRef, useMemo } from "react";

export const LampLight = forwardRef<RapierRigidBody, RigidBodyProps>(
  (props, ref) => {
    const lamp = useGLTF("/lamp.glb");
    // Clone the scene to be able to use multiple instances.
    const scene = useMemo(() => lamp.scene.clone(), [lamp]);
    return (
      <RigidBody
        scale={0.8}
        ref={ref}
        {...props}
        colliders={"cuboid"}
        restitution={0}
        friction={0.7}
        mass={1}
      >
        <primitive object={scene} castShadow />
        <pointLight
          position={[0, 1.8, -0.5]}
          castShadow
          color={"#fae493"}
          intensity={10}
        />
      </RigidBody>
    );
  }
);
