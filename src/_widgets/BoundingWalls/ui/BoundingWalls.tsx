import { MAIN_FLOOR_LENGTH, MAIN_FLOOR_WIDTH } from '_entities/floor';
import { Wall, WALL_WIDTH } from '_entities/wall';
import { LeftWall } from './LeftWall';

export const BoundingWalls = () => {
  return (
    <>
      <LeftWall />
      <Wall
        length={MAIN_FLOOR_LENGTH}
        rotate
        position-x={MAIN_FLOOR_WIDTH / 2 - WALL_WIDTH / 2}
        opacity={0.2}
      />
      <Wall
        length={MAIN_FLOOR_WIDTH - 2 * WALL_WIDTH}
        position-z={-MAIN_FLOOR_LENGTH / 2 + WALL_WIDTH / 2}
      />
      <Wall
        length={MAIN_FLOOR_WIDTH - 2 * WALL_WIDTH - MAIN_FLOOR_WIDTH / 3}
        position-z={MAIN_FLOOR_LENGTH / 2 - WALL_WIDTH / 2}
        position-x={MAIN_FLOOR_WIDTH / 3 / 2}
      />
    </>
  );
};
