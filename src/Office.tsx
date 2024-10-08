import { OrbitControls, FirstPersonControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { Physics } from '@react-three/rapier';
import { Floor } from '_entities/floor';
import { BoundingWalls } from '_widgets/BoundingWalls';
import { DevSpace } from '_widgets/DevSpace';
import { MiddleSpace } from '_widgets/MiddleSpace';
import { DesignSpace } from '_widgets/DesignSpace';
import { Reception } from '_widgets/Reception';
import { Lounge } from '_widgets/Lounge';
import { PS5 } from '_entities/ps5';
import * as THREE from 'three';

export default function Office() {
  return (
    <>
      <Perf position="top-left" />

      {/* <OrbitControls makeDefault /> */}
      <FirstPersonControls makeDefault lookSpeed={0.1} movementSpeed={10} />
      <directionalLight castShadow position={[7, 2, 0]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Physics gravity={[0, -9.81, 0]}>
        <Floor />
        <BoundingWalls />
        <DevSpace />
        <MiddleSpace />
        <DesignSpace />
        <Reception />
        <Lounge />
      </Physics>
    </>
  );
}
