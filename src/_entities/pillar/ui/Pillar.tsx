import { RigidBody } from '@react-three/rapier';
import { MAIN_FLOOR_HEIGHT } from '_entities/floor';
import { WALL_HEIGHT } from '_entities/wall';
import { useMemo } from 'react';
import * as THREE from 'three';

export const Pillar = (props: JSX.IntrinsicElements['mesh']) => {
  return (
    <RigidBody type="fixed" restitution={0} friction={0.7}>
      <mesh {...props}>
        <cylinderGeometry args={[0.5, 0.5, WALL_HEIGHT + MAIN_FLOOR_HEIGHT]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </RigidBody>
  );
};

export const LargePillar = (props: JSX.IntrinsicElements['mesh']) => {
  const length = 10,
    width = 11;

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, width);
    shape.lineTo(length, width);
    shape.lineTo(length, 0);
    shape.lineTo(0, 0);
    return shape;
  }, []);

  return (
    <RigidBody type="fixed" restitution={0} friction={0.7}>
      <mesh {...props}>
        <extrudeGeometry
          args={[
            shape,
            {
              steps: 3,
              depth: 1.916,
              bevelEnabled: true,
              bevelThickness: 2,
              bevelSize: 2,
              bevelOffset: 0,
              bevelSegments: 5,
            },
          ]}
        />
        <meshStandardMaterial color={0x3b3b3b} />
      </mesh>
    </RigidBody>
  );
};
