import { Desk } from "_entities/desk";
import { Pillar } from "_entities/pillar";
import { Wall } from "_entities/wall";
import { FullDeskGroup } from "_widgets/FullDeskGroup";
import { useControls } from "leva";

export const DevSpace = () => {
  const controls1 = useControls("dev-desk-group-1-rotation", {
    rotation: { value: Math.PI / 2, min: 0, max: Math.PI * 2, step: 0.1 },
  });
  const controls2 = useControls("dev-desk-group-2-rotation", {
    rotation: { value: Math.PI / 2, min: 0, max: Math.PI * 2, step: 0.1 },
  });
  const controls3 = useControls("dev-desk-group-3-rotation", {
    rotation: { value: 0, min: 0, max: Math.PI * 2, step: 0.1 },
  });
  const controls4 = useControls("dev-desk-group-4-rotation", {
    rotation: { value: Math.PI / 2, min: 0, max: Math.PI * 2, step: 0.1 },
  });
  return (
    <group position-z={-18}>
      <Pillar position-x={4.75} />
      <FullDeskGroup
        rotation={[0, controls1.rotation, 0]}
        position={[-3, 0, 3]}
      >
        {[Desk, Desk, Desk, Desk]}
      </FullDeskGroup>
      <FullDeskGroup
        rotation={[0, controls2.rotation, 0]}
        position={[-3, 0, 8]}
      >
        {[Desk, Desk, Desk, Desk]}
      </FullDeskGroup>
      <FullDeskGroup
        rotation={[0, controls3.rotation, 0]}
        position={[3, 0, 6.5]}
      >
        {[Desk, Desk, Desk, Desk]}
      </FullDeskGroup>
      <FullDeskGroup
        rotation={[0, controls4.rotation, 0]}
        position={[3.5, 0, 1.5]}
      >
        {[Desk, Desk]}
      </FullDeskGroup>
      {/* Left wall */}
      <Wall length={4} position-x={3.75} position-z={9} />
    </group>
  );
};
