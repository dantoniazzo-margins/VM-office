import { useFBX, useGLTF } from '@react-three/drei';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { forwardRef, useMemo } from 'react';
export const Character = forwardRef<
  RapierRigidBody | null,
  JSX.IntrinsicElements['group']
>((props, ref) => {
  const zombie = useFBX('/resources/zombie/mremireh_o_desbiens.fbx');
  // Clone the scene to be able to use multiple instances.
  return (
    <RigidBody
      scale={0.01}
      position={props.position}
      ref={ref}
      colliders="cuboid"
      restitution={0}
      friction={0.7}
      mass={1}
    >
      <primitive position-y={-1} object={zombie} castShadow />
    </RigidBody>
  );
});
