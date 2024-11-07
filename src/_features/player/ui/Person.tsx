import {
  RigidBody,
  RapierRigidBody,
  CapsuleCollider,
} from "@react-three/rapier";
import { useRef } from "react";
import { useThirdPersonCamera } from "../model/third-person.camera";
import { usePersonMovement } from "../model/person.movement";
import { INITIAL_POSITION } from "../lib/constants";

const DAMPING = 3; // Linear damping to prevent sliding

export const Person = () => {
  const body = useRef<RapierRigidBody | null>(null);
  useThirdPersonCamera({ target: body.current });
  usePersonMovement({ target: body.current });

  return (
    <RigidBody
      ref={body}
      lockRotations
      mass={1000}
      colliders="cuboid"
      linearDamping={DAMPING}
      friction={0.5}
      position={INITIAL_POSITION}
    >
      <mesh>
        <capsuleGeometry args={[0.3, 1]} />
        <meshToonMaterial wireframe color="blue" />
      </mesh>
      <mesh position={[0.1, 0.5, 0.3]}>
        <sphereGeometry args={[0.05]} />
        <meshToonMaterial color="white" />
      </mesh>
      <mesh position={[-0.1, 0.5, 0.3]}>
        <sphereGeometry args={[0.05]} />
        <meshToonMaterial color="white" />
      </mesh>
    </RigidBody>
  );
};
