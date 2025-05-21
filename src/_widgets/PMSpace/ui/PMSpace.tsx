import { Floor, MAIN_FLOOR_HEIGHT, MAIN_FLOOR_LENGTH } from "_entities/floor";
import { Vector3 } from "three";
import { PM_OFFICE_LENGTH, PM_OFFICE_WIDTH } from "../lib/constants";
import {
  RIGHT_WALL_HEIGHT,
  RIGHT_WALL_X_POSITION,
} from "_widgets/BoundingWalls/ui/RightWall";
import { Wall, WALL_HEIGHT, WALL_WIDTH } from "_entities/wall";
import { FullDeskGroup } from "_widgets/FullDeskGroup";
import { Desk } from "_entities/desk";
import { Whiteboard } from "_entities/whiteboard";
import { Sofa } from "_entities/sofa";
import { CeilingLight } from "_features/light";

export const PM_OFFICE_ENTRY_WALL_Z = 15.5;
export const SPLITTING_WALL_LENGTH = PM_OFFICE_LENGTH * 0.8;

export const PMSpace = () => {
  return (
    <group
      position={[
        RIGHT_WALL_X_POSITION + PM_OFFICE_WIDTH / 2,
        0,
        -MAIN_FLOOR_LENGTH / 2 + PM_OFFICE_LENGTH / 2 + PM_OFFICE_ENTRY_WALL_Z,
      ]}
    >
      <CeilingLight position-x={3} />
      <CeilingLight position-x={-5} />
      {/* Floor */}
      <Floor
        size={new Vector3(PM_OFFICE_WIDTH, MAIN_FLOOR_HEIGHT, PM_OFFICE_LENGTH)}
      />
      {/* Right wall */}
      <Wall
        position-z={PM_OFFICE_LENGTH / 2}
        position-x={0}
        length={PM_OFFICE_WIDTH}
      />
      {/* Left wall */}
      <Wall
        position-z={-PM_OFFICE_LENGTH / 2}
        position-x={0}
        length={PM_OFFICE_WIDTH}
      />
      {/* Separation wall */}
      <Wall
        position-x={-PM_OFFICE_WIDTH / 2 + PM_OFFICE_WIDTH / 2.5}
        position-z={PM_OFFICE_LENGTH / 2 - SPLITTING_WALL_LENGTH / 2}
        length={SPLITTING_WALL_LENGTH}
        rotate
        opacity={0.4}
      />
      {/* Short wall */}
      <Wall
        length={PM_OFFICE_LENGTH}
        rotate
        height={RIGHT_WALL_HEIGHT}
        position-x={PM_OFFICE_WIDTH / 2 - WALL_WIDTH / 2}
        position-y={
          -RIGHT_WALL_HEIGHT / 2 -
          WALL_HEIGHT / 2 +
          RIGHT_WALL_HEIGHT +
          MAIN_FLOOR_HEIGHT / 2
        }
      />
      <FullDeskGroup
        rotation={[0, Math.PI * 0.5, 0]}
        position={[-PM_OFFICE_WIDTH / 2 + PM_OFFICE_WIDTH / 5, 0, 0]}
      >
        {[Desk, Desk, Desk, Desk, Desk, Desk]}
      </FullDeskGroup>
      <FullDeskGroup
        rotation={[0, Math.PI * 0.5, 0]}
        position={[
          -PM_OFFICE_WIDTH / 2 + PM_OFFICE_WIDTH * 0.7,
          0,
          PM_OFFICE_LENGTH / 4,
        ]}
        verticalFirst
      >
        {[Desk, Desk]}
      </FullDeskGroup>
      <Desk
        rotation={[0, Math.PI * 0.5, 0]}
        position={[PM_OFFICE_WIDTH / 2 - 4, 0, -PM_OFFICE_LENGTH / 4]}
      />
      <Whiteboard
        rotation={[0, -Math.PI * 0.15, 0]}
        position={[PM_OFFICE_WIDTH / 2 - 6, 0, (-PM_OFFICE_LENGTH / 2) * 0.8]}
      />
      <Sofa rotation={[0, Math.PI / 2, 0]} position={[-12, 0, 6]} />
      <Desk
        scale={0.7}
        rotation={[0, Math.PI * 0.5, 0]}
        position={[
          PM_OFFICE_WIDTH / 2 - PM_OFFICE_WIDTH / 2.1,
          0,
          -PM_OFFICE_LENGTH / 2 + PM_OFFICE_LENGTH / 2.15,
        ]}
        color="#2e2e2e"
      />
    </group>
  );
};
