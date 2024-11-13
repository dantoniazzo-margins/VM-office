import { RigidBody } from "@react-three/rapier";
import { DESK_LEG_SIZE, DESK_SIZE } from "../lib/constants";

export default function Desk(props: JSX.IntrinsicElements["group"]) {
  return (
    <RigidBody colliders="cuboid" type="dynamic" restitution={0} friction={0.7}>
      <group position-y={-0.4} {...props}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[DESK_SIZE.x, DESK_SIZE.y, DESK_SIZE.z]} />
          <meshPhongMaterial color="#83600f" />
        </mesh>
        <mesh
          position={[
            -0.95,
            -0.5,
            DESK_SIZE.z - DESK_SIZE.z / 2 - DESK_LEG_SIZE.z / 2,
          ]}
        >
          <boxGeometry
            args={[DESK_LEG_SIZE.x, DESK_LEG_SIZE.y, DESK_LEG_SIZE.z]}
          />
          <meshPhongMaterial color="black" />
        </mesh>
        <mesh
          position={[
            -0.95,
            -0.5,
            -DESK_SIZE.z + DESK_SIZE.z / 2 + DESK_LEG_SIZE.z / 2,
          ]}
        >
          <boxGeometry
            args={[DESK_LEG_SIZE.x, DESK_LEG_SIZE.y, DESK_LEG_SIZE.z]}
          />
          <meshPhongMaterial color="black" />
        </mesh>
        <mesh position={[-0.95, -0.65 - DESK_SIZE.y + DESK_LEG_SIZE.z / 2, 0]}>
          <boxGeometry
            args={[DESK_LEG_SIZE.x, DESK_LEG_SIZE.z, 1 - DESK_LEG_SIZE.z * 2]}
          />
          <meshPhongMaterial color="black" />
        </mesh>
        <mesh
          position={[
            0.95,
            -0.5,
            DESK_SIZE.z - DESK_SIZE.z / 2 - DESK_LEG_SIZE.z / 2,
          ]}
        >
          <boxGeometry
            args={[DESK_LEG_SIZE.x, DESK_LEG_SIZE.y, DESK_LEG_SIZE.z]}
          />
          <meshPhongMaterial color="black" />
        </mesh>
        <mesh
          position={[
            0.95,
            -0.5,
            -DESK_SIZE.z + DESK_SIZE.z / 2 + DESK_LEG_SIZE.z / 2,
          ]}
        >
          <boxGeometry
            args={[DESK_LEG_SIZE.x, DESK_LEG_SIZE.y, DESK_LEG_SIZE.z]}
          />
          <meshPhongMaterial color="black" />
        </mesh>
        <mesh position={[0.95, -0.65 - DESK_SIZE.y + DESK_LEG_SIZE.z / 2, 0]}>
          <boxGeometry
            args={[DESK_LEG_SIZE.x, DESK_LEG_SIZE.z, 1 - DESK_LEG_SIZE.z * 2]}
          />
          <meshPhongMaterial color="black" />
        </mesh>
      </group>
    </RigidBody>
  );
}
