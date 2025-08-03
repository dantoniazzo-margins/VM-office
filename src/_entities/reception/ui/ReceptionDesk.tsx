import { RigidBody } from '@react-three/rapier';
import { RECEPTION_DESK_SIZE, RECEPTION_DESK_TOP_SIZE } from '../lib/constants';
export const ReceptionDesk = (props: JSX.IntrinsicElements['group']) => {
  return (
    <RigidBody
      position={props.position}
      colliders="cuboid"
      type="dynamic"
      restitution={0}
      friction={0.7}
    >
      <mesh>
        <boxGeometry
          args={[
            RECEPTION_DESK_SIZE.x,
            RECEPTION_DESK_SIZE.y,
            RECEPTION_DESK_SIZE.z,
          ]}
        />
        <meshPhongMaterial color="#2f2e2e" />
      </mesh>
      <mesh
        position={[
          -RECEPTION_DESK_SIZE.x / 2 + RECEPTION_DESK_TOP_SIZE.x / 2,
          0.5,
          0,
        ]}
      >
        <boxGeometry
          args={[
            RECEPTION_DESK_TOP_SIZE.x,
            RECEPTION_DESK_TOP_SIZE.y,
            RECEPTION_DESK_TOP_SIZE.z,
          ]}
        />
        <meshPhongMaterial color="#2f2e2e" />
      </mesh>
    </RigidBody>
  );
};
