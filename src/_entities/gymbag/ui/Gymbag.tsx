import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
export const Gymbag = (props: JSX.IntrinsicElements["group"]) => {
  const gymbag = useGLTF("/gymbag.glb");
  // Clone the scene to be able to use multiple instances.
  const scene = useMemo(() => gymbag.scene.clone(), [gymbag]);
  return (
    <RigidBody colliders="cuboid" type="fixed" restitution={0} friction={0.7}>
      <primitive
        scale={1}
        position-y={-0.675}
        {...props}
        object={scene}
        castShadow
      />
    </RigidBody>
  );
};
