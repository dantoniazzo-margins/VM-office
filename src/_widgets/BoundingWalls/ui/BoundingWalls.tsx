import { MAIN_FLOOR_LENGTH, MAIN_FLOOR_WIDTH } from '_entities/floor';
import { Wall, WALL_WIDTH } from '_entities/wall';
import { LeftWall } from './LeftWall';
import { RightWall } from './RightWall';

export const BoundingWalls = () => {
  return (
    <>
      <LeftWall />
      <RightWall />
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
