import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export const TvTable = (props: JSX.IntrinsicElements['group']) => {
  const tvTable = useGLTF('/tv_table.glb');

  return (
    <RigidBody colliders="hull" type="fixed" restitution={0} friction={0.7}>
      <primitive
        position-y={-1.35}
        {...props}
        object={tvTable.scene}
        castShadow
      />
    </RigidBody>
  );
};
