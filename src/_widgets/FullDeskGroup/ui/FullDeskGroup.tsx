import { X_SPACING } from "../lib/constants";
import { HorizontalHalfDeskGroup, Z_SPACING } from "_widgets/HalfDeskGroup";
import { FilledDeskProps } from "_widgets/FilledDesk";

export const FullDeskGroup = (props: JSX.IntrinsicElements["group"]) => {
  return (
    <group {...props}>
      <HorizontalHalfDeskGroup rotation-y={Math.PI} position-z={Z_SPACING} />
      <HorizontalHalfDeskGroup position-x={X_SPACING} />
    </group>
  );
};
