import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useMemo } from 'react';
export const Macbook = (props: JSX.IntrinsicElements['group']) => {
  const mac = useGLTF('/macbook.glb');
  // Clone the scene to be able to use multiple instances.
  const scene = useMemo(() => mac.scene.clone(), [mac]);
  return (
    <RigidBody colliders="trimesh" type="fixed" restitution={0} friction={0.7}>
      <primitive position-y={-1} {...props} object={scene} castShadow />
    </RigidBody>
  );
};
