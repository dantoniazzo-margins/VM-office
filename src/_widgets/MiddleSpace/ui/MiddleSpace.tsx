import { Desk } from "_entities/desk";
import { FLOOR_WIDTH } from "_entities/floor";
import { Wall, WALL_WIDTH } from "_entities/wall";
import { Whiteboard } from "_entities/whiteboard";
import { HorizontalHalfDeskGroup } from "_widgets/HalfDeskGroup";
export const MiddleSpace = () => {
  return (
    <group position-z={-5}>
      <Wall
        length={8}
        position-x={FLOOR_WIDTH / 3 / 2}
        opacity={0.4}
        width={0.1}
        position-z={0}
      />

      <Whiteboard position-z={7} position-x={-0.8} rotation-y={Math.PI * 0.3} />

      <Wall
        length={8}
        rotate
        position-x={-FLOOR_WIDTH / 3 / 2 + WALL_WIDTH / 2}
        position-z={4}
        opacity={0.4}
      />

      {/* Middle wall */}
      <Wall length={8} position-x={FLOOR_WIDTH / 3 / 2} position-z={8} />

      {/* Ana and Dora office */}
      <HorizontalHalfDeskGroup
        position-z={10}
        position-x={3}
        rotation-y={-Math.PI * 0.5}
      />
      {/* Dora and Ana office door */}
      <Wall
        length={3.5}
        rotate
        position-x={-FLOOR_WIDTH / 3 / 2}
        position-z={9.8}
        opacity={0.4}
        width={0.1}
      />
      {/* Designer wall */}
      <Wall length={8} position-x={FLOOR_WIDTH / 3 / 2} position-z={11.5} />
    </group>
  );
};
