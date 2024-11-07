import { Desk } from '_entities/desk';
import { Pillar } from '_entities/pillar';
import { Wall } from '_entities/wall';
import { FullDeskGroup } from '_widgets/FullDeskGroup';

export const DevSpace = () => {
  return (
    <group position-z={-18}>
      <Pillar position-x={4.75} />
      <FullDeskGroup>{[Desk, Desk, Desk, Desk]}</FullDeskGroup>

      {/* Left wall */}
      <Wall length={4} position-x={3.75} position-z={9} />
    </group>
  );
};
