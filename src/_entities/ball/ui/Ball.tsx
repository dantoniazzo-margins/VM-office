import { RapierRigidBody, RigidBody } from '@react-three/rapier';
import { ForwardedRef, forwardRef } from 'react';
import * as THREE from 'three';

interface Props {
  meshRef: React.RefObject<THREE.Mesh>;
}

export const Ball = forwardRef(
  (props: Props, ref: ForwardedRef<RapierRigidBody | null>) => {
    return (
      <RigidBody ref={ref} colliders="ball" position={[-1.5, 2, 0]}>
        <mesh ref={props.meshRef} castShadow scale={[0.2, 0.2, 0.2]}>
          <sphereGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </RigidBody>
    );
  }
);
