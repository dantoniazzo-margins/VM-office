import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { ForwardedRef, forwardRef } from 'react';

export const Ball = forwardRef(
  (_, ref: ForwardedRef<RapierRigidBody | null>) => {
    return (
      <RigidBody ref={ref} colliders="ball" position={[-1.5, 2, 0]}>
        <mesh castShadow scale={[0.2, 0.2, 0.2]}>
          <sphereGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </RigidBody>
    );
  }
);
