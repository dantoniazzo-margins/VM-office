import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import { RigidBody } from '@react-three/rapier';

interface CustomAnimationProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  url: string;
  playedAnimation?: string;
}

export const CustomAnimationWithPhysics = (props: CustomAnimationProps) => {
  const model = useGLTF(props.url);
  const animations = useAnimations(model.animations, model.scene);

  useEffect(() => {
    const action = animations.actions[props.playedAnimation || 'Idle'];
    action?.play();
  }, []);

  return (
    <RigidBody
      position={props.position}
      rotation={props.rotation}
      scale={props.scale}
      colliders="cuboid"
      restitution={0}
      friction={0.7}
    >
      <primitive object={model.scene}></primitive>
    </RigidBody>
  );
};
