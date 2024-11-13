import { Floor, MAIN_FLOOR_HEIGHT, MAIN_FLOOR_LENGTH } from "_entities/floor";
import { Vector3 } from "three";
import { PM_OFFICE_LENGTH, PM_OFFICE_WIDTH } from "../lib/constants";
import { RIGHT_WALL_X_POSITION } from "_widgets/BoundingWalls/ui/RightWall";
import { Wall, WALL_WIDTH } from "_entities/wall";

export const PM_OFFICE_ENTRY_WALL_Z = 15.5;

export const PMSpace = () => {
  return (
    <group
      position={[
        RIGHT_WALL_X_POSITION + PM_OFFICE_WIDTH / 2,
        0,
        -MAIN_FLOOR_LENGTH / 2 + PM_OFFICE_LENGTH / 2 + PM_OFFICE_ENTRY_WALL_Z,
      ]}
    >
      <Floor
        size={new Vector3(PM_OFFICE_WIDTH, MAIN_FLOOR_HEIGHT, PM_OFFICE_LENGTH)}
      />
      {/* Right wall */}
      <Wall
        position-z={PM_OFFICE_LENGTH / 2}
        position-x={WALL_WIDTH}
        length={PM_OFFICE_WIDTH - WALL_WIDTH * 2}
      />
      {/* Left wall */}
      <Wall
        position-z={-PM_OFFICE_LENGTH / 2}
        position-x={0}
        length={PM_OFFICE_WIDTH}
      />
      {/* Short wall */}
      <Wall
        length={PM_OFFICE_LENGTH}
        rotate
        position-x={PM_OFFICE_WIDTH / 2 - WALL_WIDTH / 2}
      />
    </group>
  );
};
