import { FLOOR_LENGTH, FLOOR_WIDTH } from '_entities/floor';
import { Wall, WALL_WIDTH } from '_entities/wall';

export const BoundingWalls = () => {
  return (
    <>
      <Wall
        length={FLOOR_LENGTH}
        rotate
        position-x={-FLOOR_WIDTH / 2 + WALL_WIDTH / 2}
      />
      <Wall
        length={FLOOR_LENGTH}
        rotate
        position-x={FLOOR_WIDTH / 2 - WALL_WIDTH / 2}
        opacity={0.2}
      />
      <Wall
        length={FLOOR_WIDTH - 2 * WALL_WIDTH}
        position-z={-FLOOR_LENGTH / 2 + WALL_WIDTH / 2}
      />
      <Wall
        length={FLOOR_WIDTH - 2 * WALL_WIDTH - FLOOR_WIDTH / 3}
        position-z={FLOOR_LENGTH / 2 - WALL_WIDTH / 2}
        position-x={FLOOR_WIDTH / 3 / 2}
      />
    </>
  );
};
