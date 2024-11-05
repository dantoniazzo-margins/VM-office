import * as THREE from 'three';

export type WheelInfo = {
  axleCs: THREE.Vector3;
  suspensionRestLength: number;
  suspensionStiffness: number;
  maxSuspensionTravel: number;
  position: THREE.Vector3;
  radius: number;
  x: number;
  z: number;
};
