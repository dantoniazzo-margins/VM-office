import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
export const Chair = (props: JSX.IntrinsicElements["group"]) => {
  const chair = useGLTF("/chair.glb");
  // Clone the scene to be able to use multiple instances.
  const scene = useMemo(() => chair.scene.clone(), [chair]);
  return (
    <RigidBody colliders="cuboid" type="fixed" restitution={0} friction={0.7}>
      <primitive
        scale={0.01}
        position-y={-1}
        {...props}
        object={scene}
        castShadow
      />
    </RigidBody>
  );
};
