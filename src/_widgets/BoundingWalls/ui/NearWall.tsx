import { MAIN_FLOOR_LENGTH, MAIN_FLOOR_WIDTH } from '_entities/floor';
import { Wall, WALL_WIDTH } from '_entities/wall';

export const NEAR_WALL_LENGTH = MAIN_FLOOR_WIDTH - MAIN_FLOOR_WIDTH / 2;
export const NEAR_WALL_X = MAIN_FLOOR_WIDTH / 2 - NEAR_WALL_LENGTH / 2;

export const NEAR_WALL_RIGHT_GLASS_LENGTH = 1.25;

export const NEAR_WALL_MIDDLE_WALL_LENGTH = WALL_WIDTH;

export const NearWall = () => {
  return (
    <>
      <Wall
        length={NEAR_WALL_LENGTH}
        position-z={MAIN_FLOOR_LENGTH / 2 - WALL_WIDTH / 2}
        position-x={NEAR_WALL_X}
      />
      <Wall
        length={NEAR_WALL_RIGHT_GLASS_LENGTH}
        position-z={MAIN_FLOOR_LENGTH / 2 - WALL_WIDTH / 2}
        position-x={
          NEAR_WALL_X - NEAR_WALL_LENGTH / 2 - NEAR_WALL_RIGHT_GLASS_LENGTH / 2
        }
        opacity={0.4}
      />
      <Wall
        length={NEAR_WALL_MIDDLE_WALL_LENGTH}
        position-z={MAIN_FLOOR_LENGTH / 2 - WALL_WIDTH / 2}
        position-x={
          NEAR_WALL_X -
          NEAR_WALL_LENGTH / 2 -
          NEAR_WALL_RIGHT_GLASS_LENGTH * 2 -
          NEAR_WALL_MIDDLE_WALL_LENGTH / 2
        }
      />
    </>
  );
};
