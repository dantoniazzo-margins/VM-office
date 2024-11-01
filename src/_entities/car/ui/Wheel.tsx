import { Box } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
  useRevoluteJoint,
} from "@react-three/rapier";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";

interface WheelProps {
  worldPosition: [number, number, number];
  bodyPosition: "left" | "right";
}
export const Wheel = forwardRef<RapierRigidBody, WheelProps>(
  (props: WheelProps, ref) => {
    const wheelPosition: [number, number, number] =
      props.bodyPosition === "left" ? [0.75, 0, 0] : [-0.75, 0, 0];
    const wheelRef = useRef<RapierRigidBody>(null);

    const joint = useRevoluteJoint(ref, wheelRef, [
      wheelPosition,
      [0, 0, 0],
      [1, 0, 0],
    ]);

    const [_, getKeys] = useKeyboardControls();

    useFrame(() => {
      if (joint.current && wheelRef.current) {
        const keys = getKeys();
        if (keys.forward) {
          wheelRef.current.wakeUp();
          joint.current.configureMotorVelocity(-20, 10);
        } else if (keys.backward) {
          wheelRef.current.wakeUp();
          joint.current.configureMotorVelocity(20, 10);
        } else joint.current.configureMotorVelocity(0, 10);
      }
    });

    return (
      <group>
        <RigidBody
          position={props.worldPosition}
          colliders="cuboid"
          ref={ref}
          type="dynamic"
        >
          <Box scale={[0.5, 0.5, 0.5]} castShadow receiveShadow name="wheel">
            <meshStandardMaterial color={"red"} />
          </Box>
        </RigidBody>
        <RigidBody
          colliders={false}
          position={wheelPosition}
          type="dynamic"
          ref={wheelRef}
        >
          <CylinderCollider
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
            args={[0.4, 0.8]}
          />
        </RigidBody>
      </group>
    );
  }
);
