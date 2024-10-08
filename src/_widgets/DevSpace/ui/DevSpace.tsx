import { Chair } from '_entities/chair';
import { Desk } from '_entities/desk';
import { Pillar } from '_entities/pillar';
import { Wall } from '_entities/wall';

export const DevSpace = () => {
  return (
    <>
      <Pillar position-x={4.75} position-z={-18} />

      <Desk position-z={-16} position-x={3} />
      <Desk position-z={-17.75} position-x={3} />
      <Desk position-z={-16} position-x={-2} />
      <Desk position-z={-17.75} position-x={-2} />
      <Desk position-z={-16} position-x={-3} />
      <Desk position-z={-17.75} position-x={-3} />
      <Desk position-z={-11} position-x={-3} />
      <Desk position-z={-12.75} position-x={-3} />
      <Desk position-z={-11} position-x={-2} />
      <Desk position-z={-12.75} position-x={-2} />

      <Desk position-z={-11.75} position-x={2.75} rotation-y={Math.PI * 0.5} />
      <Desk position-z={-12.75} position-x={2.75} rotation-y={Math.PI * 0.5} />
      <Desk position-z={-11.75} position-x={4.5} rotation-y={Math.PI * 0.5} />
      <Desk position-z={-12.75} position-x={4.5} rotation-y={Math.PI * 0.5} />
      <group position-z={-17.75}>
        <Chair position-z={0} position-x={3.75} rotation-y={Math.PI * -0.5} />
        <Chair
          position-z={1.75}
          position-x={3.75}
          rotation-y={Math.PI * -0.5}
        />
      </group>
      {/* Left wall */}
      <Wall length={4} position-x={3.75} position-z={-9} />
    </>
  );
};
