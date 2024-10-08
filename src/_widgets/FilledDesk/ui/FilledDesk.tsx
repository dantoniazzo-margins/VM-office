import { Desk } from '_entities/desk';
import { Macbook } from '_entities/macbook';
import { Monitor } from '_entities/monitor';

export const FilledDesk = (props: JSX.IntrinsicElements['group']) => {
  return (
    <group {...props}>
      <Desk />
      <Macbook position-y={-0.28} position-x={0.15} rotation-y={Math.PI} />
      <Monitor
        position-y={-0.28}
        rotation-y={Math.PI * 0.5}
        position-x={-0.25}
      />
    </group>
  );
};
