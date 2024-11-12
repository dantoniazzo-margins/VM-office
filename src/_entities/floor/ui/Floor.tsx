import { RigidBody } from '@react-three/rapier';
import { Vector3 } from 'three';

interface FloorProps {
  size: Vector3;
}

export const Floor = (props: FloorProps) => {
  return (
    <RigidBody type="fixed" restitution={0} friction={0.7}>
      <mesh receiveShadow position-y={-1.25}>
        <boxGeometry args={[props.size.x, props.size.y, props.size.z]} />
        <meshStandardMaterial color="#30323b" />
      </mesh>
    </RigidBody>
  );
};
