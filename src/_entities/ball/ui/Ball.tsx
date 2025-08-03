import { RigidBody, RigidBodyProps } from '@react-three/rapier';

export const Ball = (props: RigidBodyProps) => {
  return (
    <RigidBody colliders="ball" {...props}>
      <mesh castShadow scale={[0.3, 0.3, 0.3]}>
        <sphereGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
};
