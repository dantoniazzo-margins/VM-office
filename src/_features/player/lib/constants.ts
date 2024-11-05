import { Vector3 } from 'three';
import * as THREE from 'three';
import { WheelInfo } from '../model/types';

export const INITIAL_POSITION: Vector3 = new Vector3(-4, 0, 18.6);

export const spawn = {
  position: [-4, 2, 18.6] as THREE.Vector3Tuple,
  rotation: [0, -Math.PI / 2, 0] as THREE.Vector3Tuple,
};

export const CHASSIS_SIZE = [0.16, 0.05, 0.1] as THREE.Vector3Tuple;

const wheelInfo: Omit<WheelInfo, 'position'> = {
  axleCs: new THREE.Vector3(0, 0, -1),
  suspensionRestLength: 0.1,
  suspensionStiffness: 1.3,
  maxSuspensionTravel: 1,
  radius: 0.04,
  x: 0.1,
  z: 0.05,
};

export const WHEEL_SIZE = [
  wheelInfo.radius,
  wheelInfo.radius,
  wheelInfo.z,
] as THREE.Vector3Tuple;

export const wheels: WheelInfo[] = [
  // front
  {
    position: new THREE.Vector3(-wheelInfo.x, -wheelInfo.radius, -wheelInfo.z),
    ...wheelInfo,
  },
  {
    position: new THREE.Vector3(-wheelInfo.x, -wheelInfo.radius, wheelInfo.z),
    ...wheelInfo,
  },
  // rear
  {
    position: new THREE.Vector3(wheelInfo.x, -wheelInfo.radius, -wheelInfo.z),
    ...wheelInfo,
  },
  {
    position: new THREE.Vector3(wheelInfo.x, -wheelInfo.radius, wheelInfo.z),
    ...wheelInfo,
  },
];
