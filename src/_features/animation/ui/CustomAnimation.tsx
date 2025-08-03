import { useAnimations, useGLTF } from '@react-three/drei';
import { act, useEffect, useMemo } from 'react';
import { RigidBody } from '@react-three/rapier';

interface CustomAnimationProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  url: string;
  playedAnimation?: string;
}

export const CustomAnimation = (props: CustomAnimationProps) => {
  const model = useGLTF(props.url);
  const animations = useAnimations(model.animations, model.scene);

  useEffect(() => {
    const action = animations.actions[props.playedAnimation || 'Idle'];
    action?.play();
  }, []);

  return (
    <primitive
      position={props.position}
      rotation={props.rotation}
      scale={props.scale}
      object={model.scene}
    ></primitive>
  );
};
