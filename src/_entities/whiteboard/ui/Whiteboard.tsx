import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
export const Whiteboard = (props: JSX.IntrinsicElements["group"]) => {
  const whiteboard = useGLTF("/whiteboard.glb");
  return (
    <RigidBody colliders="cuboid" type="dynamic" restitution={0} friction={0.7}>
      <primitive
        scale={0.5}
        position-y={-1}
        {...props}
        object={whiteboard.scene}
        castShadow
      />
    </RigidBody>
  );
};
