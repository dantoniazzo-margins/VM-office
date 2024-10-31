import { Box, Cylinder } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  CylinderCollider,
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
    if (joint.current && wheel.current) {
      const keys = getKeys();
      if (keys.forward) {
        wheel.current.applyTorqueImpulse({ x: -1, y: 0, z: 0 }, true);
      } else if (keys.backward) {
        wheel.current.applyTorqueImpulse({ x: 1, y: 0, z: 0 }, true);
      }
    }
  });

  return null;
};

export const ThreeCar = () => {
  const bodyRef = useRef<RapierRigidBody>(null);
  const wheelPositions: [number, number, number][] = [
    [-2, -0.3, 1.5],
    [-2, -0.3, -1.5],
    [2, -0.3, 1.5],
    [2, -0.3, -1.5],
  ];
  const wheelRefs = useRef(
    wheelPositions.map(() => createRef<RapierRigidBody>())
  );

  return (
    <group>
      <RigidBody mass={100} colliders="cuboid" ref={bodyRef} type="dynamic">
        <Box scale={[2, 1, 7]} castShadow receiveShadow name="chassis">
          <meshStandardMaterial color={'red'} />
        </Box>
      </RigidBody>
      {wheelPositions.map((wheelPosition, index) => (
        <RigidBody
          colliders={false}
          mass={10}
          friction={10}
          position={wheelPosition}
          type="dynamic"
          key={index}
          ref={wheelRefs.current[index]}
        >
          <CylinderCollider
            mass={10}
            friction={10}
            rotation={[Math.PI / 2, 0, Math.PI / 2]}
            args={[0.4, 0.8]}
          />
        </RigidBody>
      ))}
      {wheelPositions.map((wheelPosition, index) => (
        <WheelJoint
          key={index}
          body={bodyRef}
          wheel={wheelRefs.current[index]}
          bodyAnchor={[
            wheelPosition[0],
            wheelPosition[1],
            wheelPosition[2] + wheelPosition[2] + wheelPosition[2],
          ]}
          wheelAnchor={[0, 0, 0]}
          rotationAxis={[1, 0, 0]}
        />
      ))}
    </group>
  );
};
