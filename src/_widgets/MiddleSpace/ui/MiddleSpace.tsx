import { Desk } from '_entities/desk';
import { FLOOR_LENGTH, FLOOR_WIDTH } from '_entities/floor';
import { Wall, WALL_WIDTH } from '_entities/wall';
import { Whiteboard } from '_entities/whiteboard';
export const MiddleSpace = () => {
  return (
    <>
      {/* Middle section */}

      {/* Glass wall */}
      <Wall
        length={8}
        position-x={FLOOR_WIDTH / 3 / 2}
        position-z={-5}
        opacity={0.4}
        width={0.1}
      />
      <Desk position-z={-1.25} position-x={2} />
      <Desk position-z={0.5} position-x={2} />
      <Whiteboard position-z={2} position-x={-0.8} rotation-y={Math.PI * 0.3} />

      <Wall
        length={8}
        rotate
        position-x={-FLOOR_WIDTH / 3 / 2 + WALL_WIDTH / 2}
        position-z={-1}
      />

      {/* Middle wall */}
      <Wall length={8} position-x={FLOOR_WIDTH / 3 / 2} position-z={3} />

      {/* Ana and Dora office */}
      <Desk position-z={5} position-x={2.67} rotation-y={Math.PI * 0.5} />
      <Desk position-z={5} position-x={1} rotation-y={Math.PI * 0.5} />

      {/* Dora and Ana office door */}
      <Wall
        length={3.5}
        rotate
        position-x={-FLOOR_WIDTH / 3 / 2}
        position-z={
          FLOOR_LENGTH / 2 -
          FLOOR_LENGTH / 3 -
          FLOOR_LENGTH / 4 / 3 / 2 -
          WALL_WIDTH / 2
        }
        opacity={0.4}
        width={0.1}
      />
      {/* Designer wall */}
      <Wall length={8} position-x={FLOOR_WIDTH / 3 / 2} position-z={6.5} />
    </>
  );
};
