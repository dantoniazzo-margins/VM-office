import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { useThirdPersonCamera } from '../model/third-person.camera';
import { usePlayerMovement } from '../model/player.movement';
import { INITIAL_POSITION } from '../lib/constants';

export const Player = () => {
  const body = useRef<RapierRigidBody | null>(null);
  useThirdPersonCamera({ target: body.current });
  usePlayerMovement({ target: body.current });

  return (
    <RigidBody
      ref={body}
      canSleep={false}
      colliders="cuboid"
      restitution={0.2}
      friction={0.1}
      linearDamping={0.5}
      angularDamping={0.5}
      mass={5}
      position={INITIAL_POSITION}
    >
      <mesh castShadow>
        <boxGeometry args={[0.5, 1, 0.3]} />
        <meshStandardMaterial flatShading color="#1948bf" />
      </mesh>
    </RigidBody>
  );
};
