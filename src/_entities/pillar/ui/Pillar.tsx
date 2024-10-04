import { RigidBody } from '@react-three/rapier';
import { FLOOR_HEIGHT } from '_entities/floor';
import { WALL_HEIGHT } from '_entities/wall';

export const Pillar = (props: JSX.IntrinsicElements['mesh']) => {
  return (
    <RigidBody type="fixed" restitution={0} friction={0.7}>
      <mesh {...props}>
        <cylinderGeometry args={[0.5, 0.5, WALL_HEIGHT + FLOOR_HEIGHT]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </RigidBody>
  );
};
