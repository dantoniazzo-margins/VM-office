import { useGLTF } from "@react-three/drei";
import { RigidBody, RigidBodyProps } from "@react-three/rapier";
import { useMemo } from "react";
export const BeanBag = (props: RigidBodyProps) => {
  const beanBag = useGLTF("/bean_bag.glb");
  // Clone the scene to be able to use multiple instances.
  const scene = useMemo(() => beanBag.scene.clone(), [beanBag]);
  return (
    <RigidBody
      position-y={-1}
      scale={0.7}
      type="dynamic"
      colliders="hull"
      restitution={0}
      friction={0.7}
      {...props}
    >
      <primitive object={scene} castShadow />
    </RigidBody>
  );
};
