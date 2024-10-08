import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useMemo } from 'react';
export const Monitor = (props: JSX.IntrinsicElements['group']) => {
  const monitor = useGLTF('/monitor.glb');
  // Clone the scene to be able to use multiple instances.
  const scene = useMemo(() => monitor.scene.clone(), [monitor]);
  return (
    <RigidBody colliders="hull" type="fixed" restitution={0} friction={0.7}>
      <primitive
        scale={0.2}
        position-y={-1}
        {...props}
        object={scene}
        castShadow
      />
    </RigidBody>
  );
};
