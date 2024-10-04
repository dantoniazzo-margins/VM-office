import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
export const Shelf = (props: JSX.IntrinsicElements['group']) => {
  const shelf = useGLTF('/shelf.glb');
  return (
    <RigidBody colliders="trimesh" type="fixed" restitution={0} friction={0.7}>
      <primitive
        position-y={-0.89}
        {...props}
        object={shelf.scene}
        castShadow
      />
    </RigidBody>
  );
};
