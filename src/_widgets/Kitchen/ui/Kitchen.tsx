import { Floor, MAIN_FLOOR_HEIGHT, MAIN_FLOOR_LENGTH } from '_entities/floor';
import { Vector3 } from 'three';
import { KITCHEN_LENGTH, KITCHEN_WIDTH } from '../lib/constants';
import { LEFT_WALL_X_POSITION } from '_widgets/BoundingWalls/ui/LeftWall';
import { Wall, WALL_WIDTH } from '_entities/wall';

export const KITCHEN_SHORT_WALL_LEGTH = KITCHEN_WIDTH - WALL_WIDTH / 2;

export const KITCHEN_FIRST_WALL_Z = KITCHEN_LENGTH / 3.3;
export const KITCHEN_SECOND_WALL_Z = -KITCHEN_LENGTH / 2;

export const KITCHEN_THIRD_WALL_LENGTH =
  KITCHEN_FIRST_WALL_Z - KITCHEN_SECOND_WALL_Z - WALL_WIDTH;
export const KITCHEN_THIRD_WALL_Z =
  -KITCHEN_LENGTH / 2 + KITCHEN_THIRD_WALL_LENGTH / 2 + WALL_WIDTH / 2;

export const KITCHEN_SMALL_WALL_LENGTH = KITCHEN_SHORT_WALL_LEGTH / 4;
export const KITCHEN_LARGE_WALL_LENGTH = KITCHEN_SHORT_WALL_LEGTH / 2.15;

export const Kitchen = () => {
  return (
    <group
      position={[
        LEFT_WALL_X_POSITION - KITCHEN_WIDTH / 2,
        0,
        MAIN_FLOOR_LENGTH / 2 - KITCHEN_LENGTH / 2,
      ]}
    >
      <Floor
        size={new Vector3(KITCHEN_WIDTH, MAIN_FLOOR_HEIGHT, KITCHEN_LENGTH)}
      />
      <Wall
        length={KITCHEN_SHORT_WALL_LEGTH}
        position-x={-WALL_WIDTH / 4}
        position-z={KITCHEN_SECOND_WALL_Z}
        color="#c0b309"
      />
      <Wall
        length={KITCHEN_SHORT_WALL_LEGTH}
        position-x={-WALL_WIDTH / 4}
        position-z={KITCHEN_FIRST_WALL_Z}
        color="#3b3b3b"
      />
      <Wall
        length={KITCHEN_THIRD_WALL_LENGTH}
        position-x={-KITCHEN_WIDTH / 2}
        position-z={KITCHEN_THIRD_WALL_Z}
        rotate
        opacity={0.5}
      />
      <Wall
        length={KITCHEN_SMALL_WALL_LENGTH}
        position-x={
          -KITCHEN_WIDTH / 2 + WALL_WIDTH / 2 + KITCHEN_SMALL_WALL_LENGTH / 2
        }
        position-z={-4}
        color="#3b3b3b"
      />
      <Wall
        length={KITCHEN_LARGE_WALL_LENGTH}
        position-x={
          KITCHEN_WIDTH / 2 - WALL_WIDTH / 2 - KITCHEN_LARGE_WALL_LENGTH / 2
        }
        position-z={-4}
        color="#3b3b3b"
      />
    </group>
  );
};
