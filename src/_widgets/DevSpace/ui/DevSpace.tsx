import { Chair } from "_entities/chair";
import { Pillar } from "_entities/pillar";
import { Wall } from "_entities/wall";
import { FullDeskGroup } from "_widgets/FullDeskGroup";
import { HorizontalHalfDeskGroup } from "_widgets/HalfDeskGroup";

export const DevSpace = () => {
  return (
    <group position-z={-18}>
      <Pillar position-x={4.75} />
      <HorizontalHalfDeskGroup position-z={0.25} position-x={3} />
      <FullDeskGroup position-z={0.25} position-x={-3} />
      <FullDeskGroup position-z={4.5} position-x={-3} />
      <FullDeskGroup
        position-z={6.25}
        position-x={3}
        rotation-y={Math.PI * 0.5}
      />
      {/* Left wall */}
      <Wall length={4} position-x={3.75} position-z={9} />
    </group>
  );
};
