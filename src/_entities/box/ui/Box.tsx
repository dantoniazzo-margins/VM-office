import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
export const Box = (props: JSX.IntrinsicElements["group"]) => {
  const box = useGLTF("/cardboard_box.glb");
  // Clone the scene to be able to use multiple instances.
  const scene = useMemo(() => box.scene.clone(), [box]);
  return (
    <RigidBody colliders="trimesh" type="fixed" restitution={0} friction={0.7}>
      <primitive {...props} object={scene} castShadow />
    </RigidBody>
  );
};
