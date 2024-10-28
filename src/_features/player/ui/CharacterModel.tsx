import { forwardRef, useEffect, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { useFBX } from '_shared/lib';
import { useKeyboardControls } from '@react-three/drei';
import React from 'react';

interface Props {
  position: Vector3;
  rotation: Vector3;
}

const CharacterState = {
  IDLE: 'idle',
  WALK: 'walk',
  RUN: 'run',
  DANCE: 'dance',
};

// Character Model Component
export const CharacterModel = forwardRef<Props, JSX.IntrinsicElements['group']>(
  ({ position, rotation }, ref) => {
    const group = useRef();
    const { model, animations, mixer, loadAnimation } = useFBX(
      '/resources/zombie/mremireh_o_desbiens.fbx'
    );
    const [currentAnimation, setCurrentAnimation] = useState(
      CharacterState.IDLE
    );
    const [_, getKeys] = useKeyboardControls();
    const keys = getKeys();
    // Load animations
    useEffect(() => {
      if (mixer) {
        loadAnimation('idle', '/resources/zombie/idle.fbx');
        loadAnimation('walk', '/resources/zombie/walk.fbx');
        loadAnimation('run', '/resources/zombie/run.fbx');
        loadAnimation('dance', '/resources/zombie/dance.fbx');
      }
    }, [mixer, loadAnimation]);

    // Handle animation state changes
    useEffect(() => {
      if (!mixer || !animations[currentAnimation]) return;

      let newState = CharacterState.IDLE;

      if (keys.forward || keys.backward || keys.left || keys.right) {
        newState = keys.shift ? CharacterState.RUN : CharacterState.WALK;
      } else if (keys.space) {
        newState = CharacterState.DANCE;
      }

      if (newState !== currentAnimation && animations[newState]) {
        const prevAction = animations[currentAnimation]?.action;
        const nextAction = animations[newState]?.action;

        if (prevAction && nextAction) {
          prevAction.fadeOut(0.5);
          nextAction.reset().fadeIn(0.5).play();
        }

        setCurrentAnimation(newState);
      }
    }, [keys, animations, currentAnimation, mixer]);

    React.useImperativeHandle(ref, () => group.current);

    if (!model) return null;

    return (
      <group ref={group} scale={0.1} position={position} rotation={rotation}>
        <primitive object={model} />
      </group>
    );
  }
);
