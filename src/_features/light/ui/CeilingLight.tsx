import { forwardRef, useMemo } from "react";
import {
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";

interface CeilingLightProps {
  "position-x"?: number;
  "position-z"?: number;
}

export const CeilingLight = forwardRef((props: CeilingLightProps) => {
  const ceilingLight = useGLTF("/ceiling_light.glb");
  // Clone the scene to be able to use multiple instances.
  const scene = useMemo(() => ceilingLight.scene.clone(), [ceilingLight]);
  return (
    <group
      position-y={1.35}
      position-x={props["position-x"]}
      position-z={props["position-z"]}
    >
      <primitive scale={0.25} object={scene} castShadow />
      <pointLight position-y={-0.1} color={"white"} intensity={5} />
    </group>
  );
});
