import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useMemo } from 'react';
export const PS5 = (props: JSX.IntrinsicElements['group']) => {
  const ps5 = useGLTF('./ps5.glb');
  // Clone the scene to be able to use multiple instances.
  const scene = useMemo(() => ps5.scene.clone(), [ps5]);
  return (
    <RigidBody colliders="hull" type="fixed" restitution={0} friction={0.7}>
      <primitive
        scale={0.0016}
        position-y={-1}
        {...props}
        object={scene}
        castShadow
      />
    </RigidBody>
  );
};

export const PS5Contoller = (props: JSX.IntrinsicElements['group']) => {
  const ps5Controller = useGLTF('./ps5_controller.glb');
  // Clone the scene to be able to use multiple instances.
  const scene = useMemo(() => ps5Controller.scene.clone(), [ps5Controller]);
  return (
    <RigidBody colliders="hull" type="fixed" restitution={0} friction={0.7}>
      <primitive
        scale={0.6}
        position-y={-1}
        {...props}
        object={scene}
        castShadow
      />
    </RigidBody>
  );
};
