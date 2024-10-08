import { X_SPACING } from '../lib/constants';
import { HorizontalHalfDeskGroup, Z_SPACING } from '_widgets/HalfDeskGroup';

export const FullDeskGroup = (props: JSX.IntrinsicElements['group']) => {
  return (
    <group {...props}>
      <HorizontalHalfDeskGroup rotation-y={Math.PI} position-z={Z_SPACING} />
      <HorizontalHalfDeskGroup position-x={X_SPACING} />
    </group>
  );
};
