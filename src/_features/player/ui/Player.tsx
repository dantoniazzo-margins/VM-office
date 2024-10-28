import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { useRef } from 'react';
import { useThirdPersonCamera } from '../model/third-person.camera';
import { usePlayerMovement } from '../model/player.movement';
import { INITIAL_POSITION } from '../lib/constants';
import { Car } from '_entities/car';
import { CharacterModel } from './CharacterModel';

export const Player = () => {
  const body = useRef<RapierRigidBody | null>(null);
  useThirdPersonCamera({ target: body.current });
  usePlayerMovement({ target: body.current });

  return <Car position={INITIAL_POSITION} ref={body} />;
};
