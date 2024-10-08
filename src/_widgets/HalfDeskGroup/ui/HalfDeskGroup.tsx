import { Desk } from '_entities/desk';
import { X_SPACING } from '_widgets/FullDeskGroup';
import { Z_SPACING } from '../lib/constants';
import { Chair } from '_entities/chair';

export const HorizontalHalfDeskGroup = (
  props: JSX.IntrinsicElements['group']
) => {
  return (
    <group {...props}>
      <Desk position-z={Z_SPACING} />
      <Desk />
      <Chair rotation-y={Math.PI * -0.5} position-x={0.75} />
      <Chair
        rotation-y={Math.PI * -0.5}
        position-x={1}
        position-z={Z_SPACING}
      />
    </group>
  );
};

export const VerticalHalfDeskGroup = (
  props: JSX.IntrinsicElements['group']
) => {
  return (
    <group {...props}>
      <Desk />
      <Desk position-x={X_SPACING} />
      <Chair rotation-y={Math.PI * -0.5} position-x={1.5} />
      <Chair rotation-y={Math.PI * 0.5} position-x={-1} />
    </group>
  );
};
