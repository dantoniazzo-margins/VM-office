import { useGLTF } from '@react-three/drei';
import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { forwardRef, useMemo } from 'react';
export const Car = forwardRef<
  RapierRigidBody | null,
  JSX.IntrinsicElements['group']
>((props, ref) => {
  const car = useGLTF('/car.glb');
  // Clone the scene to be able to use multiple instances.
  const scene = useMemo(() => car.scene.clone(), [car]);
  return (
    <RigidBody
      scale={0.02}
      position={props.position}
      ref={ref}
      colliders="cuboid"
      restitution={0}
      friction={0.7}
      mass={1}
    >
      <primitive rotation-y={Math.PI} object={scene} castShadow />
    </RigidBody>
  );
});
