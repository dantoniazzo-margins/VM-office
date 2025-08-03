import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useMemo } from 'react';
export const Chair = (props: JSX.IntrinsicElements['group']) => {
  const chair = useGLTF('/chair.glb');
  // Clone the scene to be able to use multiple instances.
  const scene = useMemo(() => chair.scene.clone(), [chair]);
  return (
    <RigidBody
      position-y={-1}
      scale={1}
      colliders="cuboid"
      restitution={0}
      friction={0.7}
    >
      <primitive {...props} object={scene} castShadow />
    </RigidBody>
  );
};
