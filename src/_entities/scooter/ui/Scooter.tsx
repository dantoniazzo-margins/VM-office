import { useGLTF } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { forwardRef, useMemo } from "react";
export const Scooter = forwardRef<
  RapierRigidBody | null,
  JSX.IntrinsicElements["group"]
>((props, ref) => {
  const scooter = useGLTF("/scooter.glb");
  // Clone the scene to be able to use multiple instances.
  const scene = useMemo(() => scooter.scene.clone(), [scooter]);
  return (
    <RigidBody
      position={props.position}
      ref={ref}
      colliders="cuboid"
      restitution={0}
      friction={0.7}
      mass={1}
    >
      <primitive
        scale={0.7}
        rotation-y={Math.PI}
        position-y={-0.5}
        object={scene}
        castShadow
      />
    </RigidBody>
  );
});
