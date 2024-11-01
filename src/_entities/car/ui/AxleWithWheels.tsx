import { Box, useKeyboardControls } from "@react-three/drei";
import {
  RapierRigidBody,
  RigidBody,
  useRevoluteJoint,
} from "@react-three/rapier";
import { useRef } from "react";
import { Wheel } from "./Wheel";
import { useFixedJoint } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

interface WheelProps {
  worldPosition: [number, number, number];
}
export const AxleWithWheels = (props: WheelProps) => {
  const bodyRef = useRef<RapierRigidBody>(null);
  const smallBox = useRef<RapierRigidBody>(null);
  const secondBox = useRef<RapierRigidBody>(null);
  const rightWheelRef = useRef<RapierRigidBody>(null);
  const joint = useRevoluteJoint(smallBox, bodyRef, [
    [0, 0, 0],
    [6, 0, 0],
    [1, 0, 0],
  ]);

  const joint2 = useRevoluteJoint(smallBox, secondBox, [
    [0, 0, 0],
    [0, 0, 2],
    [0, 0, 1],
  ]);

  const [_, getKeys] = useKeyboardControls();
  useFrame(() => {
    if (joint.current && smallBox.current) {
      const keys = getKeys();
      if (keys.forward) {
        smallBox.current.wakeUp();
        joint.current.configureMotorVelocity(50, 10);
      } else if (keys.backward) {
        smallBox.current.wakeUp();
        joint.current.configureMotorVelocity(-50, 10);
      } else joint.current.configureMotorVelocity(0, 10);
    }

    if (joint2.current && secondBox.current) {
      const keys = getKeys();
      if (keys.forward) {
        secondBox.current.wakeUp();
        joint2.current.configureMotorVelocity(50, 10);
      } else if (keys.backward) {
        secondBox.current.wakeUp();
        joint2.current.configureMotorVelocity(-50, 10);
      } else joint2.current.configureMotorVelocity(0, 10);
    }
  });
  return (
    <>
      <RigidBody colliders="cuboid" ref={bodyRef} type="dynamic">
        <Box args={[5, 0.5, 0.5]} castShadow receiveShadow name="axle">
          <meshStandardMaterial color={"red"} />
        </Box>
      </RigidBody>
      <RigidBody
        position={[6, 0, 0]}
        colliders="cuboid"
        ref={smallBox}
        type="dynamic"
      >
        <Box args={[0.5, 0.5, 0.5]} castShadow receiveShadow name="axle">
          <meshStandardMaterial color={"blue"} />
        </Box>
      </RigidBody>
      <RigidBody
        position={[6, 0, 4]}
        colliders="cuboid"
        ref={secondBox}
        type="dynamic"
      >
        <Box args={[0.5, 0.5, 0.5]} castShadow receiveShadow name="axle">
          <meshStandardMaterial color={"purple"} />
        </Box>
      </RigidBody>
      {/*  <Wheel
        worldPosition={[40, 0, 0]}
        ref={leftWheelRef}
        bodyPosition="left"
      /> */}

      {/*   <Wheel
        ref={rightWheelRef}
        worldPosition={[-300, 0, 0]}
        bodyPosition="right"
      /> */}
    </>
  );
};
