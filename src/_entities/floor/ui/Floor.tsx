import { RigidBody } from '@react-three/rapier';
import { FLOOR_HEIGHT, FLOOR_LENGTH, FLOOR_WIDTH } from '../lib/constants';

export const Floor = () => {
  return (
    <RigidBody type="fixed" restitution={0} friction={0.7}>
      <mesh receiveShadow position-y={-1.25}>
        <boxGeometry args={[FLOOR_WIDTH, FLOOR_HEIGHT, FLOOR_LENGTH]} />
        <meshStandardMaterial color="#30323b" />
      </mesh>
    </RigidBody>
  );
};
