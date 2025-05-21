import { Desk } from "_entities/desk";
import { Character } from "_entities/character";
import { FullDeskGroup, GAP } from "_widgets/FullDeskGroup";
import { CeilingLight, LampLight } from "_features/light";
import { Window, WINDOW_WIDTH } from "_entities/window";
import {
  RIGHT_WALL_FIRST_PART_LENGTH,
  RIGHT_WALL_X_POSITION,
} from "_widgets/BoundingWalls";
import { MAIN_FLOOR_LENGTH } from "_entities/floor";

export const INITIAL_DESIGN_WINDOW_Z_POSITION = -2.7;

export const numOfWindows: number[] = new Array(15).fill(0);

export const DesignSpace = () => {
  return (
    <group position-z={8}>
      {numOfWindows.map((_, i) => {
        return (
          <Window
            position-x={RIGHT_WALL_X_POSITION}
            position-z={INITIAL_DESIGN_WINDOW_Z_POSITION + i * WINDOW_WIDTH}
            rotation={[0, Math.PI / 2, 0]}
            key={`design-window-${i}`}
          />
        );
      })}
      <LampLight position={[5, -0.5, -3]} rotation={[0, Math.PI / 2, 0]} />
      <LampLight position={[5, -0.5, 3]} />
      <LampLight position={[5, -0.5, 7.5]} />
      <LampLight position={[5, -0.5, 10.5]} />
      <CeilingLight position-x={1.5} position-z={5} />
      <CeilingLight position-x={-3.7} position-z={5} />
      <FullDeskGroup position={[1, 0, -0.4]}>
        {[Desk, Desk, Desk, Desk]}
      </FullDeskGroup>
      <Desk position={[4 + GAP, 0, -0.93]} />
      <Desk position={[4 + GAP, 0, 0.13]} />
      <FullDeskGroup position={[1, 0, 5.4]}>{[Desk, Desk]}</FullDeskGroup>
      <Desk position={[4 + GAP, 0, 4.87]} />
      <Character
        rotation={[0, Math.PI * 0.5, 0]}
        position={[-0.6, 1, 2]}
        url="/sara.glb"
        collider="hull"
      />

      <CeilingLight position-x={1.5} position-z={14} />
    </group>
  );
};
