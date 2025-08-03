import { useGLTF, Text } from '@react-three/drei';
import { useMemo } from 'react';
import { type JSX } from 'react';

export const Logo = (props: JSX.IntrinsicElements['group']) => {
  const logo = useGLTF('/margins.glb');
  const scene = useMemo(() => logo.scene.clone(), [logo]);
  return (
    <Text
      position={props.position}
      font="./bangers-v20-latin-regular.woff"
      fontSize={0.7}
    >
      The office
    </Text>
  );
};
