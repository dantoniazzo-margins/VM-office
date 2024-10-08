import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
export const ReceptionDesk = (props: JSX.IntrinsicElements['group']) => {
  const receptionDesk = useGLTF('/reception_desk.glb');
  return (
    <RigidBody colliders="trimesh" type="fixed" restitution={0} friction={0.7}>
      <primitive
        {...props}
        position-y={-0.65}
        object={receptionDesk.scene}
        castShadow
      />
    </RigidBody>
  );
};
