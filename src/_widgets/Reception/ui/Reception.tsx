import { Wall } from "_entities/wall";
import { ReceptionDesk } from "_entities/reception";

export const Reception = () => {
  return (
    <group position-z={17.5}>
      <Wall length={2} rotate color="#2f2e2e" />
      <ReceptionDesk position-x={-1.5} />
    </group>
  );
};
