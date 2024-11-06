import { Desk } from '_entities/desk';

export interface FilledDeskCustomProps {
  hasBox?: boolean;
}
export type FilledDeskProps = JSX.IntrinsicElements['group'] &
  FilledDeskCustomProps;

export const FilledDesk = (props: FilledDeskProps) => {
  return (
    <group {...props}>
      <Desk />
    </group>
  );
};
