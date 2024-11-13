import { useGLTF } from '@react-three/drei';
import { RigidBody, RigidBodyProps } from '@react-three/rapier';
import { useMemo } from 'react';
export const Sofa = (props: RigidBodyProps) => {
  const sofa = useGLTF('/sofa.glb');
  const scene = useMemo(() => sofa.scene.clone(), [sofa]);
  return (
    <RigidBody
      {...props}
      colliders="cuboid"
      type="dynamic"
      restitution={0}
      friction={0.7}
    >
      <primitive scale={1} object={scene} castShadow />
    </RigidBody>
  );
};
