import { MAIN_FLOOR_LENGTH, MAIN_FLOOR_WIDTH } from '_entities/floor';
import { Wall, WALL_HEIGHT } from '_entities/wall';

export const Ceiling = () => {
  return (
    <Wall
      length={MAIN_FLOOR_WIDTH * 5}
      width={MAIN_FLOOR_LENGTH + 10}
      height={0.2}
      position-y={1.5}
    />
  );
};
