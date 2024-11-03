import { Box, useKeyboardControls } from '@react-three/drei';
import {
  CuboidCollider,
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
  useRevoluteJoint,
} from '@react-three/rapier';
import { useRef } from 'react';
import { Wheel } from './Wheel';
import { useFixedJoint } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';

interface WheelProps {
  worldPosition: [number, number, number];
}
export const AxleWithWheels = (props: WheelProps) => {
  const bodyRef = useRef<RapierRigidBody>(null);
  const smallBoxPosition: [number, number, number] = [2.5, 0.5, 0];
  const smallBox = useRef<RapierRigidBody>(null);
  const secondBoxPosition: [number, number, number] = [0.6, 0, 0];
  const secondBox = useRef<RapierRigidBody>(null);
  const rightWheelRef = useRef<RapierRigidBody>(null);
  const joint = useRevoluteJoint(bodyRef, smallBox, [
    [2.5, 0.35, 0],
    [0, 0, 0],
    [0, 1, 0],
  ]);

  const joint2 = useRevoluteJoint(smallBox, secondBox, [
    secondBoxPosition,
    [0, 0, 0],
    [1, 0, 0],
  ]);

  const [_, getKeys] = useKeyboardControls();
  useFrame(() => {
    if (joint.current && smallBox.current) {
      const keys = getKeys();
      if (keys.left) {
        smallBox.current.wakeUp();
        joint.current.configureMotorVelocity(100, 10);
      } else if (keys.right) {
        smallBox.current.wakeUp();
        joint.current.configureMotorVelocity(-100, 10);
      } else joint.current.configureMotorVelocity(0, 10);
    }

    if (joint2.current && secondBox.current) {
      const keys = getKeys();
      if (keys.forward) {
        secondBox.current.wakeUp();
        joint2.current.configureMotorVelocity(-1000, 10);
      } else if (keys.backward) {
        secondBox.current.wakeUp();
        joint2.current.configureMotorVelocity(1000, 10);
      } else joint2.current.configureMotorVelocity(0, 10);
    }
  });
  return (
    <group>
      <RigidBody
        position={props.worldPosition}
        colliders="cuboid"
        ref={bodyRef}
        type="dynamic"
      >
        <Box args={[5, 0.5, 0.5]} castShadow receiveShadow name="axle">
          <meshStandardMaterial color={'red'} />
        </Box>
      </RigidBody>
      <RigidBody
        position={smallBoxPosition}
        colliders="cuboid"
        ref={smallBox}
        type="dynamic"
      >
        <CuboidCollider args={[0.3, 0.1, 0.1]} />
      </RigidBody>
      <RigidBody
        position={secondBoxPosition}
        colliders="cuboid"
        ref={secondBox}
        type="dynamic"
      >
        <CylinderCollider rotation={[0, 0, Math.PI / 2]} args={[0.15, 0.7]} />
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
    </group>
  );
};
