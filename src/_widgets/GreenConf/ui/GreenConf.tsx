import {
  Floor,
  MAIN_FLOOR_HEIGHT,
  MAIN_FLOOR_LENGTH,
  MAIN_FLOOR_WIDTH,
} from '_entities/floor';
import { Wall, WALL_WIDTH } from '_entities/wall';
import {
  NEAR_WALL_LENGTH,
  NEAR_WALL_MIDDLE_WALL_LENGTH,
  NEAR_WALL_RIGHT_GLASS_LENGTH,
  NEAR_WALL_X,
} from '_widgets/BoundingWalls';
import { Vector3 } from 'three';

export const GREEN_CONF_SIZE = new Vector3(
  MAIN_FLOOR_WIDTH,
  MAIN_FLOOR_HEIGHT,
  3.34
);

export const GREEN_CONF_NEAR_WALL_LENGTH =
  NEAR_WALL_LENGTH +
  NEAR_WALL_RIGHT_GLASS_LENGTH * 2 +
  NEAR_WALL_MIDDLE_WALL_LENGTH;

export const GreenConf = () => {
  return (
    <group position={[0, 0, MAIN_FLOOR_LENGTH / 2 + GREEN_CONF_SIZE.z / 2]}>
      <Floor size={GREEN_CONF_SIZE} />
      <Wall
        position-z={GREEN_CONF_SIZE.z / 2 - WALL_WIDTH / 2}
        position-x={MAIN_FLOOR_WIDTH / 2 - GREEN_CONF_NEAR_WALL_LENGTH / 2}
        length={GREEN_CONF_NEAR_WALL_LENGTH}
        color="#5d9058"
      />
      <Wall
        position-z={GREEN_CONF_SIZE.z / 2 - WALL_WIDTH / 2}
        position-x={-MAIN_FLOOR_WIDTH / 2 + 3 / 2}
        length={4}
        color="#565656"
      />
      <Wall
        length={GREEN_CONF_SIZE.z}
        rotate
        position-x={MAIN_FLOOR_WIDTH / 2 - WALL_WIDTH / 2}
      />
      <Wall
        length={GREEN_CONF_SIZE.z}
        rotate
        position-x={
          MAIN_FLOOR_WIDTH / 2 - GREEN_CONF_NEAR_WALL_LENGTH + WALL_WIDTH / 2
        }
      />
    </group>
  );
};
