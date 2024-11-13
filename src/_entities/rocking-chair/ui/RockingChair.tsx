import { useGLTF } from '@react-three/drei';
import { RigidBody, RigidBodyProps } from '@react-three/rapier';
import { useMemo } from 'react';
export const RockingChair = (props: RigidBodyProps) => {
  const chair = useGLTF('/rocking_chair.glb');
  // Clone the scene to be able to use multiple instances.
  const scene = useMemo(() => chair.scene.clone(), [chair]);
  return (
    <RigidBody
      position-y={-1}
      scale={0.01}
      type="dynamic"
      colliders="cuboid"
      restitution={0}
      friction={0.7}
      {...props}
    >
      <primitive object={scene} castShadow />
    </RigidBody>
  );
};
