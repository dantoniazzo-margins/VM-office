import { Box, Cylinder, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  RapierRigidBody,
  RigidBody,
  useRevoluteJoint,
  Vector3Array,
} from "@react-three/rapier";
import { createRef, RefObject, useRef } from "react";

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
  const [_, getKeys] = useKeyboardControls();
  const joint = useRevoluteJoint(body, wheel, [
    bodyAnchor,
    wheelAnchor,
    rotationAxis,
  ]);

  useFrame(() => {
    if (wheel.current) {
      const keys = getKeys();
      if (keys.forward) {
        if (Math.abs(wheel.current.userForce().x) > 0.05) return;
        wheel.current.addForce({ x: 0.01, y: 0, z: 0 }, true);
      } else if (keys.backward) {
        if (Math.abs(wheel.current.userForce().x) > 0.05) return;
        wheel.current.addForce({ x: -0.01, y: 0, z: 0 }, true);
      } else {
        wheel.current.resetForces(true);
      }
    }
  });

  return null;
};

export const ThreeCar = () => {
  const bodyRef = useRef<RapierRigidBody>(null);
  const wheelPositions: [number, number, number][] = [
    [-0.3, 0, 0.3],
    [-0.3, 0, -0.3],
    [0.3, 0, 0.3],
    [0.3, 0, -0.3],
  ];
  const wheelRefs = useRef(
    wheelPositions.map(() => createRef<RapierRigidBody>())
  );

  return (
    <group>
      <RigidBody colliders="cuboid" ref={bodyRef} type="dynamic">
        <Box scale={[0.5, 0.2, 0.3]} castShadow receiveShadow name="chassis">
          <meshStandardMaterial color={"red"} />
        </Box>
      </RigidBody>
      {wheelPositions.map((wheelPosition, index) => (
        <RigidBody
          position={wheelPosition}
          colliders="hull"
          type="dynamic"
          key={index}
          ref={wheelRefs.current[index]}
        >
          <Cylinder
            rotation={[Math.PI / 2, 0, 0]}
            args={[0.1, 0.1, 0.1, 32]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color={"grey"} />
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
