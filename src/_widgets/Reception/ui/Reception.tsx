import { Wall } from '_entities/wall';
import { ReceptionDesk } from '_entities/reception';

export const Reception = () => {
  return (
    <group position-z={14.5}>
      <Wall length={2} rotate color="#2f2e2e" position-z={0} position-x={0} />
      <ReceptionDesk position-z={0.2} position-x={-1.2} scale={[1, 1, 1]} />
    </group>
  );
};
