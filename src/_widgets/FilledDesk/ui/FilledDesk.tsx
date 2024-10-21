import { Desk } from "_entities/desk";
import { Macbook } from "_entities/macbook";
import { Monitor } from "_entities/monitor";
import { Box } from "_entities/box";

export interface FilledDeskCustomProps {
  hasBox?: boolean;
}
export type FilledDeskProps = JSX.IntrinsicElements["group"] &
  FilledDeskCustomProps;

export const FilledDesk = (props: FilledDeskProps) => {
  return (
    <group {...props}>
      <Desk />
      {props.hasBox && (
        <Box
          scale={0.5}
          position-y={-0.141}
          position-x={-0.2}
          rotation-y={Math.PI * 0.5}
        />
      )}

      <Macbook position-y={-0.28} position-x={0.15} rotation-y={Math.PI} />
      <Monitor
        position-y={props.hasBox ? -0.052 : -0.285}
        rotation-y={Math.PI * 0.5}
        position-x={-0.17}
      />
    </group>
  );
};
