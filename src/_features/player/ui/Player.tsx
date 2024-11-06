import {
  RigidBody,
  RapierRigidBody,
  CapsuleCollider,
} from '@react-three/rapier';
import { useRef } from 'react';
import { useThirdPersonCamera } from '../model/third-person.camera';
import { usePlayerMovement } from '../model/player.movement';
import { INITIAL_POSITION } from '../lib/constants';

const DAMPING = 3; // Linear damping to prevent sliding

export const Player = () => {
  const body = useRef<RapierRigidBody | null>(null);
  useThirdPersonCamera({ target: body.current });
  usePlayerMovement({ target: body.current });

  return (
    <RigidBody
      ref={body}
      lockRotations
      colliders="cuboid"
      linearDamping={DAMPING}
      friction={0.5}
      position={INITIAL_POSITION}
    >
      <mesh>
        <capsuleGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </RigidBody>
  );
};
