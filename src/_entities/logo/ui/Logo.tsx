import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { type JSX } from "react";

export const Logo = (props: JSX.IntrinsicElements["group"]) => {
  const logo = useGLTF("/margins.glb");
  const scene = useMemo(() => logo.scene.clone(), [logo]);
  return <primitive {...props} scale={0.4} object={scene} castShadow />;
};
