import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useMemo } from "react";
export const Couch = (props: JSX.IntrinsicElements["group"]) => {
  const couch = useGLTF("/couch.glb");
  const scene = useMemo(() => couch.scene.clone(), [couch]);
  return (
    <RigidBody
      colliders="trimesh"
      type="dynamic"
      restitution={0}
      friction={0.7}
      scale={props.scale ?? 0.8}
    >
      <primitive {...props} position-y={-1} object={scene} castShadow />
    </RigidBody>
  );
};
