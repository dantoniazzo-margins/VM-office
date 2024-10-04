import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
export const TV = (props: JSX.IntrinsicElements['group']) => {
  const tv = useGLTF('/tv.glb');
  return (
    <RigidBody colliders="trimesh" type="fixed" restitution={0} friction={0.7}>
      <primitive {...props} object={tv.scene} castShadow />
    </RigidBody>
  );
};
