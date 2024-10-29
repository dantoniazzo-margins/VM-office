import { useFBX, useGLTF } from '@react-three/drei';
import {
  RapierRigidBody,
  RigidBody,
  RigidBodyAutoCollider,
} from '@react-three/rapier';
import { forwardRef, useMemo } from 'react';

type CharacterProps = {
  url: string;
  collider?: RigidBodyAutoCollider;
} & JSX.IntrinsicElements['group'];
export const Character = forwardRef<RapierRigidBody | null, CharacterProps>(
  (props, ref) => {
    const character = useGLTF(props.url);
    /* const zombie = useFBX('/resources/zombie/mremireh_o_desbiens.fbx'); */
    // Clone the scene to be able to use multiple instances.
    return (
      <RigidBody
        scale={1}
        position={props.position}
        ref={ref}
        colliders={props.collider}
        restitution={0}
        friction={0.7}
        mass={1}
      >
        <primitive
          rotation={props.rotation}
          object={character.scene}
          castShadow
        />
      </RigidBody>
    );
  }
);
