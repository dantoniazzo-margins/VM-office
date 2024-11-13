import {
  MAIN_FLOOR_HEIGHT,
  MAIN_FLOOR_LENGTH,
  MAIN_FLOOR_WIDTH,
} from '_entities/floor';
import { Wall, WALL_HEIGHT, WALL_WIDTH } from '_entities/wall';
import { DESIGNER_WALL_Z, MIDDLE_SPACE_OFFSET } from '_widgets/MiddleSpace';
import { PM_OFFICE_ENTRY_WALL_Z } from '_widgets/PMSpace';

export const RIGHT_WALL_FIRST_PART_LENGTH =
  MAIN_FLOOR_LENGTH / 2 - (MIDDLE_SPACE_OFFSET + DESIGNER_WALL_Z);

export const RIGHT_WALL_LAST_PART_LENGTH = PM_OFFICE_ENTRY_WALL_Z;

export const RIGHT_WALL_X_POSITION = MAIN_FLOOR_WIDTH / 2 - WALL_WIDTH / 2;

export const RIGHT_WALL_HEIGHT = WALL_HEIGHT / 2;

export const RightWall = () => {
  return (
    <>
      <Wall
        height={RIGHT_WALL_HEIGHT}
        length={RIGHT_WALL_FIRST_PART_LENGTH}
        rotate
        position-y={MAIN_FLOOR_HEIGHT / 2 - RIGHT_WALL_HEIGHT / 2}
        position-x={RIGHT_WALL_X_POSITION}
        position-z={MAIN_FLOOR_LENGTH / 2 - RIGHT_WALL_FIRST_PART_LENGTH / 2}
      />
      <Wall
        height={RIGHT_WALL_HEIGHT}
        length={RIGHT_WALL_LAST_PART_LENGTH}
        rotate
        position-y={MAIN_FLOOR_HEIGHT / 2 - RIGHT_WALL_HEIGHT / 2}
        position-x={RIGHT_WALL_X_POSITION}
        position-z={-MAIN_FLOOR_LENGTH / 2 + RIGHT_WALL_LAST_PART_LENGTH / 2}
      />
    </>
  );
};
