import { RigidBody } from "@react-three/rapier";
import { RECEPTION_DESK_SIZE, RECEPTION_DESK_TOP_SIZE } from "../lib/constants";
export const ReceptionDesk = (props: JSX.IntrinsicElements["group"]) => {
  return (
    <RigidBody colliders="cuboid" type="dynamic" restitution={0} friction={0.7}>
      <group {...props} position={[0, -RECEPTION_DESK_SIZE.y / 2, 0]}>
        <mesh>
          <boxGeometry
            args={[
              RECEPTION_DESK_SIZE.x,
              RECEPTION_DESK_SIZE.y,
              RECEPTION_DESK_SIZE.z,
            ]}
          />
          <meshPhongMaterial color="#282317" />
        </mesh>
        <mesh
          position={[
            -RECEPTION_DESK_SIZE.x / 2 + RECEPTION_DESK_TOP_SIZE.x / 2,
            0.7,
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
          <meshPhongMaterial color="#282317" />
        </mesh>
      </group>
    </RigidBody>
  );
};
