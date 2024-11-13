import { Floor, MAIN_FLOOR_HEIGHT, MAIN_FLOOR_LENGTH } from '_entities/floor';
import { Vector3 } from 'three';
import { PM_OFFICE_LENGTH, PM_OFFICE_WIDTH } from '../lib/constants';
import { RIGHT_WALL_X_POSITION } from '_widgets/BoundingWalls/ui/RightWall';

export const PM_OFFICE_ENTRY_WALL_Z = 14;

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
    </group>
  );
};
