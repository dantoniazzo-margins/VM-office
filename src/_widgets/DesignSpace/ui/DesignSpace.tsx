import { Desk } from '_entities/desk';
import { FullDeskGroup } from '_widgets/FullDeskGroup';
import { VerticalHalfDeskGroup, Z_SPACING } from '_widgets/HalfDeskGroup';

export const DesignSpace = () => {
  return (
    <group position-z={9}>
      <FullDeskGroup rotation-y={Math.PI * 0.5} />
      <VerticalHalfDeskGroup position-x={3.35} rotation-y={Math.PI * 0.5} />
    </group>
  );
};
