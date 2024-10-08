import { TV } from '_entities/tv';
import { TvTable } from '_entities/tv-table';
import { PS5 } from '_entities/ps5';

export const TVSetup = (props: JSX.IntrinsicElements['group']) => {
  return (
    <group {...props}>
      <TV position-y={0.15} rotation-y={Math.PI} position-x={-0.3} />
      <TvTable position-z={-0.8} position-x={0.3} scale={[1.8, 1, 1]} />
      <PS5 position-y={-0.46} position-x={1} position-z={0.1} />
    </group>
  );
};
