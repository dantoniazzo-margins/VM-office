import { Desk } from '_entities/desk';
import { X_SPACING } from '_widgets/FullDeskGroup';
import { Z_SPACING } from '../lib/constants';
import { Chair } from '_entities/chair';
import { FilledDesk } from '_widgets/FilledDesk';

export const HorizontalHalfDeskGroup = (
  props: JSX.IntrinsicElements['group']
) => {
  return (
    <group {...props}>
      <FilledDesk position-z={Z_SPACING} />
      <FilledDesk />
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
      <FilledDesk position-x={X_SPACING} />
      <FilledDesk rotation-y={Math.PI} />
      <Chair rotation-y={Math.PI * -0.5} position-x={1.5} />
      <Chair rotation-y={Math.PI * 0.5} position-x={-1} />
    </group>
  );
};
