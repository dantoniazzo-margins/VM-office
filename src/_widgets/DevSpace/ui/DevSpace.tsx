import { Desk } from '_entities/desk';
import { MAIN_FLOOR_LENGTH, MAIN_FLOOR_WIDTH } from '_entities/floor';
import { Pillar } from '_entities/pillar';
import { Wall, WALL_WIDTH } from '_entities/wall';
import { FullDeskGroup } from '_widgets/FullDeskGroup';
import { PM_OFFICE_ENTRY_WALL_Z } from '_widgets/PMSpace';
import { CeilingLight } from '_features/light';
import { Window, WINDOW_WIDTH } from '_entities/window';
import { RIGHT_WALL_X_POSITION } from '_widgets/BoundingWalls';

export const INITIAL_DEV_WINDOW_Z_POSITION = 0.92;

export const numOfWindows: number[] = new Array(11).fill(0);

export const DevSpace = () => {
  return (
    <group position-z={-MAIN_FLOOR_LENGTH / 2}>
      {numOfWindows.map((_, i) => {
        return (
          <Window
            position-x={RIGHT_WALL_X_POSITION}
            position-z={INITIAL_DEV_WINDOW_Z_POSITION + i * WINDOW_WIDTH}
            rotation={[0, Math.PI / 2, 0]}
            key={`dev-window-${i}`}
          />
        );
      })}
      <Wall
        length={1}
        width={1}
        position-x={-MAIN_FLOOR_WIDTH / 2 + 0.5 + WALL_WIDTH}
        position-z={0.5 + WALL_WIDTH}
      />

      <CeilingLight position-z={5} />
      <Pillar position-x={4.75} position-z={2} />
      {/* Top left */}
      <FullDeskGroup rotation={[0, Math.PI / 2, 0]} position={[-3, 0, 4.5]}>
        {[Desk, Desk, Desk, Desk]}
      </FullDeskGroup>

      {/* Bottom left */}
      <FullDeskGroup rotation={[0, Math.PI / 2, 0]} position={[-3, 0, 9.5]}>
        {[Desk, Desk, Desk, Desk]}
      </FullDeskGroup>
      {/* Bottom right */}
      <FullDeskGroup position={[3, 0, 12.5]}>
        {[Desk, Desk, Desk, Desk]}
      </FullDeskGroup>
      {/* Top right */}
      <FullDeskGroup rotation={[0, Math.PI / 2, 0]} position={[3.5, 0, 4.5]}>
        {[Desk, Desk]}
      </FullDeskGroup>
      {/* Left wall */}
      <Wall length={4} position-x={3.75} position-z={PM_OFFICE_ENTRY_WALL_Z} />
    </group>
  );
};
