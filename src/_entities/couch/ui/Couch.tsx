import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
export const Couch = (props: JSX.IntrinsicElements['group']) => {
  const couch = useGLTF('/couch.glb');
  return (
    <RigidBody
      colliders="trimesh"
      type="dynamic"
      restitution={0}
      friction={0.7}
    >
      <primitive {...props} position-y={-1} object={couch.scene} castShadow />
    </RigidBody>
  );
};
