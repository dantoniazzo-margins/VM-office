import { MAIN_FLOOR_LENGTH, MAIN_FLOOR_WIDTH } from "_entities/floor";
import { Wall, WALL_HEIGHT } from "_entities/wall";

interface CeilingProps {
  length: number;
  width: number;
}

export const Ceiling = (props: CeilingProps) => {
  return (
    <Wall
      length={props.length}
      width={props.width}
      height={0.2}
      position-y={1.5}
    />
  );
};
