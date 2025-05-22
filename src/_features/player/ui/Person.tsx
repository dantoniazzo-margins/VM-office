import {
  RigidBody,
  RapierRigidBody,
  CapsuleCollider,
} from "@react-three/rapier";
import { useMemo, useRef } from "react";
import { useThirdPersonCamera } from "../model/third-person.camera";
import { usePersonMovement } from "../model/person.movement";
import { useGLTF } from "@react-three/drei";
import { Keys } from "_features/controls";
import { Vector3 } from "three";

const DAMPING = 3; // Linear damping to prevent sliding

export interface PersonProps {
  isLocalUser?: boolean;
  keys: () => Keys;
  initialPosition: Vector3;
}

export const Person = (props: PersonProps) => {
  const body = useRef<RapierRigidBody | null>(null);
  const fox = useGLTF("/fox.glb");

  useThirdPersonCamera({
    target: body.current,
    isLocalUser: props.isLocalUser,
  });
  usePersonMovement({
    target: body.current,
    model: fox,
    keys: props.keys,
    initialPosition: props.initialPosition,
  });

  return (
    <RigidBody
      ref={body}
      colliders="cuboid"
      linearDamping={DAMPING}
      friction={0.5}
      rotation={[0, Math.PI, 0]}
      position={props.initialPosition}
    >
      <primitive scale={0.01} object={fox.scene} castShadow />
    </RigidBody>
  );
};
