import { MAIN_FLOOR_LENGTH, MAIN_FLOOR_WIDTH } from '_entities/floor';
import { Wall, WALL_WIDTH } from '_entities/wall';

export const FIRST_PART_LENGTH = MAIN_FLOOR_LENGTH * 0.1;
export const SECOND_PART_LENGTH = MAIN_FLOOR_LENGTH * 0.75;
export const FIRST_GLASS_LENGTH = MAIN_FLOOR_LENGTH * 0.055;
export const SECOND_GLASS_LENGTH = MAIN_FLOOR_LENGTH * 0.055;
export const LEFT_WALL_X_POSITION = -MAIN_FLOOR_WIDTH / 2 + WALL_WIDTH / 2;

export const LeftWall = () => {
  return (
    <>
      <Wall
        length={FIRST_PART_LENGTH}
        rotate
        position-x={LEFT_WALL_X_POSITION}
        position-z={MAIN_FLOOR_LENGTH / 2 - FIRST_PART_LENGTH / 2}
      />
      <Wall
        length={SECOND_PART_LENGTH}
        rotate
        position-x={LEFT_WALL_X_POSITION}
        position-z={-MAIN_FLOOR_LENGTH / 2 + SECOND_PART_LENGTH / 2}
      />
      <Wall
        length={FIRST_GLASS_LENGTH}
        rotate
        opacity={0.2}
        position-x={LEFT_WALL_X_POSITION}
        position-z={
          MAIN_FLOOR_LENGTH / 2 - FIRST_GLASS_LENGTH / 2 - FIRST_PART_LENGTH
        }
      />
      <Wall
        length={SECOND_GLASS_LENGTH}
        rotate
        opacity={0.2}
        position-x={LEFT_WALL_X_POSITION}
        position-z={
          -MAIN_FLOOR_LENGTH / 2 + SECOND_PART_LENGTH + SECOND_GLASS_LENGTH / 2
        }
      />
    </>
  );
};