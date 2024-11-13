import { Desk } from '_entities/desk';
import { Character } from '_entities/character';
import { FullDeskGroup, GAP } from '_widgets/FullDeskGroup';

export const DesignSpace = () => {
  return (
    <group position-z={9}>
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
    </group>
  );
};
