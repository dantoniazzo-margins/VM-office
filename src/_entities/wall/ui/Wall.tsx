import { RigidBody } from '@react-three/rapier';
import { WALL_HEIGHT, WALL_LENGTH, WALL_WIDTH } from '../lib/constants';
import { MAIN_FLOOR_HEIGHT } from '_entities/floor';

interface Props {
  length: number;
  width?: number;
  rotate?: boolean;
  color?: string;
  ['position-x']?: number;
  ['position-y']?: number;
  ['position-z']?: number;
  opacity?: number;
}

export const Wall = (props: Props) => {
  return (
    <RigidBody type="fixed" restitution={0} friction={0.7}>
      <mesh
        receiveShadow
        position-x={props['position-x']}
        position-y={props['position-y'] || MAIN_FLOOR_HEIGHT / 2}
        position-z={props['position-z']}
        rotation-y={props.rotate ? Math.PI * 0.5 : 0}
      >
        <boxGeometry
          args={[
            props.length || WALL_LENGTH,
            WALL_HEIGHT,
            props.width ?? WALL_WIDTH,
          ]}
        />
        <meshPhongMaterial
          color={props.color ?? 'gray'}
          opacity={props.opacity ?? 1}
          transparent
        />
      </mesh>
    </RigidBody>
  );
};
