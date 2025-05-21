import { Wall } from "_entities/wall";
import { ReceptionDesk } from "_entities/reception";
import { CeilingLight } from "_features/light";

export const Reception = () => {
  return (
    <group position-z={17.5}>
      <Wall length={2} rotate color="#2f2e2e" />
      <ReceptionDesk position-x={-1.5} />
      <CeilingLight position-x={-3.7} position-z={0} />
      <CeilingLight position-x={-3.7} position-z={5} />
    </group>
  );
};
