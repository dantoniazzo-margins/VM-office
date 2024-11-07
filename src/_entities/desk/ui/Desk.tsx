import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { DESK_SIZE } from "../lib/constants";

export default function Desk(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  return (
    <RigidBody colliders="cuboid" type="fixed" restitution={0} friction={0.7}>
      <group ref={group} position-y={-0.4} {...props} dispose={null}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[DESK_SIZE.x, DESK_SIZE.y, DESK_SIZE.z]} />
          <meshToonMaterial color="#91740a" />
        </mesh>
        <mesh position={[-0.95, -0.5, 0]}>
          <boxGeometry args={[0.1, 0.9, 1]} />
          <meshToonMaterial color="black" />
        </mesh>
        <mesh position={[0.95, -0.5, 0]}>
          <boxGeometry args={[0.1, 0.9, 1]} />
          <meshToonMaterial color="black" />
        </mesh>
      </group>
    </RigidBody>
  );
}

useGLTF.preload("./desk.gltf");
