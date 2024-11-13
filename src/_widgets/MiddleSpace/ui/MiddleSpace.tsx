import { Desk } from '_entities/desk';
import { MAIN_FLOOR_WIDTH } from '_entities/floor';
import { Wall, WALL_WIDTH } from '_entities/wall';
import { Whiteboard } from '_entities/whiteboard';

export const MIDDLE_SPACE_OFFSET = -5;

export const DESIGNER_WALL_Z = 11.5;

export const MiddleSpace = () => {
  return (
    <group position-z={MIDDLE_SPACE_OFFSET}>
      <Wall
        length={8}
        position-x={MAIN_FLOOR_WIDTH / 3 / 2}
        opacity={0.4}
        width={0.1}
        position-z={0}
      />

      <Wall
        length={8}
        rotate
        position-x={-MAIN_FLOOR_WIDTH / 3 / 2 + WALL_WIDTH / 2}
        position-z={4}
        opacity={0.4}
      />

      {/* Middle wall */}
      <Wall length={8} position-x={MAIN_FLOOR_WIDTH / 3 / 2} position-z={8} />

      {/* Ana and Dora office */}
      <Desk position-z={3} />
      {/* Dora and Ana office door */}
      <Wall
        length={3.5}
        rotate
        position-x={-MAIN_FLOOR_WIDTH / 3 / 2}
        position-z={9.8}
        opacity={0.4}
        width={0.1}
      />
      {/* Designer wall */}
      <Wall
        length={8}
        position-x={MAIN_FLOOR_WIDTH / 3 / 2}
        position-z={DESIGNER_WALL_Z}
      />
    </group>
  );
};
