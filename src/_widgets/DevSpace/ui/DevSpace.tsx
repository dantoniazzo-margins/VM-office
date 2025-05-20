import { Desk } from '_entities/desk';
import { MAIN_FLOOR_LENGTH, MAIN_FLOOR_WIDTH } from '_entities/floor';
import { Pillar } from '_entities/pillar';
import { Wall, WALL_WIDTH } from '_entities/wall';
import { FullDeskGroup } from '_widgets/FullDeskGroup';
import { PM_OFFICE_ENTRY_WALL_Z } from '_widgets/PMSpace';
import { useControls } from 'leva';
import { CeilingLight } from '_features/light';

export const DevSpace = () => {
  const controls1 = useControls('dev-desk-group-1-rotation', {
    rotation: { value: Math.PI / 2, min: 0, max: Math.PI * 2, step: 0.1 },
  });
  const controls2 = useControls('dev-desk-group-2-rotation', {
    rotation: { value: Math.PI / 2, min: 0, max: Math.PI * 2, step: 0.1 },
  });
  const controls3 = useControls('dev-desk-group-3-rotation', {
    rotation: { value: 0, min: 0, max: Math.PI * 2, step: 0.1 },
  });
  const controls4 = useControls('dev-desk-group-4-rotation', {
    rotation: { value: Math.PI / 2, min: 0, max: Math.PI * 2, step: 0.1 },
  });
  return (
    <group position-z={-MAIN_FLOOR_LENGTH / 2}>
      <Wall
        length={1}
        width={1}
        position-x={-MAIN_FLOOR_WIDTH / 2 + 0.5 + WALL_WIDTH}
        position-z={0.5 + WALL_WIDTH}
      />
      <CeilingLight position-z={5} />
      <Pillar position-x={4.75} position-z={2} />
      {/* Top left */}
      <FullDeskGroup
        rotation={[0, controls1.rotation, 0]}
        position={[-3, 0, 4.5]}
      >
        {[Desk, Desk, Desk, Desk]}
      </FullDeskGroup>

      {/* Bottom left */}
      <FullDeskGroup
        rotation={[0, controls2.rotation, 0]}
        position={[-3, 0, 9.5]}
      >
        {[Desk, Desk, Desk, Desk]}
      </FullDeskGroup>
      {/* Bottom right */}
      <FullDeskGroup
        rotation={[0, controls3.rotation, 0]}
        position={[3, 0, 12.5]}
      >
        {[Desk, Desk, Desk, Desk]}
      </FullDeskGroup>
      {/* Top right */}
      <FullDeskGroup
        rotation={[0, controls4.rotation, 0]}
        position={[3.5, 0, 4.5]}
      >
        {[Desk, Desk]}
      </FullDeskGroup>
      {/* Left wall */}
      <Wall length={4} position-x={3.75} position-z={PM_OFFICE_ENTRY_WALL_Z} />
    </group>
  );
};
