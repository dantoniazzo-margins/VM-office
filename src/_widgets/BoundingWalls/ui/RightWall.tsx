import { MAIN_FLOOR_LENGTH, MAIN_FLOOR_WIDTH } from '_entities/floor';
import { Wall, WALL_WIDTH } from '_entities/wall';

export const RIGHT_WALL_X_POSITION = MAIN_FLOOR_WIDTH / 2 - WALL_WIDTH / 2;

export const RightWall = () => {
  return (
    <Wall
      length={MAIN_FLOOR_LENGTH}
      rotate
      position-x={RIGHT_WALL_X_POSITION}
      opacity={0.2}
    />
  );
};
