import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
export const Chair = (props: JSX.IntrinsicElements['group']) => {
  const chair = useGLTF('/chair.glb');
  return (
    <RigidBody colliders="trimesh" type="fixed" restitution={0} friction={0.7}>
      <primitive
        scale={0.01}
        position-y={-1}
        {...props}
        object={chair.scene}
        castShadow
      />
    </RigidBody>
  );
};
