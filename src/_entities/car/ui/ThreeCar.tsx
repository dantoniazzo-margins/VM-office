import { Box, Cylinder } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  RapierRigidBody,
  RigidBody,
  useRevoluteJoint,
  Vector3Array,
} from '@react-three/rapier';
import { createRef, RefObject, useRef } from 'react';
import { useKeyboardControls } from '@react-three/drei';
const WheelJoint = ({
  body,
  wheel,
  bodyAnchor,
  wheelAnchor,
  rotationAxis,
}: {
  body: RefObject<RapierRigidBody>;
  wheel: RefObject<RapierRigidBody>;
  bodyAnchor: Vector3Array;
  wheelAnchor: Vector3Array;
  rotationAxis: Vector3Array;
}) => {
  const joint = useRevoluteJoint(body, wheel, [
    bodyAnchor,
    wheelAnchor,
    rotationAxis,
  ]);
  const [_, getKeys] = useKeyboardControls();

  useFrame(() => {
    if (joint.current) {
      const keys = getKeys();
      if (keys.forward) joint.current.configureMotorVelocity(10, 10);
      else if (keys.backward) joint.current.configureMotorVelocity(-10, 10);
      else joint.current.configureMotorVelocity(0, 10);
    }
  });

  return null;
};

export const ThreeCar = () => {
  const bodyRef = useRef<RapierRigidBody>(null);
  const wheelPositions: [number, number, number][] = [
    [-3, 0, 3],
    [-3, 0, -3],
    [3, 0, 3],
    [3, 0, -3],
  ];
  const wheelRefs = useRef(
    wheelPositions.map(() => createRef<RapierRigidBody>())
  );

  return (
    <group>
      <RigidBody mass={20} colliders="cuboid" ref={bodyRef} type="dynamic">
        <Box scale={[10, 1.5, 2]} castShadow receiveShadow name="chassis">
          <meshStandardMaterial color={'red'} />
        </Box>
      </RigidBody>
      {wheelPositions.map((wheelPosition, index) => (
        <RigidBody
          friction={1}
          position={wheelPosition}
          colliders="ball"
          type="dynamic"
          key={index}
          ref={wheelRefs.current[index]}
        >
          <Cylinder
            rotation={[Math.PI / 2, 0, 0]}
            args={[1, 1, 1, 32]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color={'grey'} />
          </Cylinder>
        </RigidBody>
      ))}
      {wheelPositions.map((wheelPosition, index) => (
        <WheelJoint
          key={index}
          body={bodyRef}
          wheel={wheelRefs.current[index]}
          bodyAnchor={wheelPosition}
          wheelAnchor={[0, 0, 0]}
          rotationAxis={[0, 0, 1]}
        />
      ))}
    </group>
  );
};
