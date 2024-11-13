import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useMemo } from 'react';
export const Whiteboard = (props: JSX.IntrinsicElements['group']) => {
  const whiteboard = useGLTF('/whiteboard.glb');
  const scene = useMemo(() => whiteboard.scene.clone(), [whiteboard]);
  return (
    <RigidBody colliders="hull" type="dynamic" restitution={0} friction={0.7}>
      <primitive
        scale={0.5}
        position-y={-1}
        {...props}
        object={scene}
        castShadow
      />
    </RigidBody>
  );
};
