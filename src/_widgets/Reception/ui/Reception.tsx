import { Wall } from '_entities/wall';
import { ReceptionDesk } from '_entities/reception';

export const Reception = () => {
  return (
    <>
      <Wall
        length={2}
        rotate
        color="#2f2e2e"
        position-z={14.5}
        position-x={0}
      />
      <ReceptionDesk position-z={14.7} position-x={-1.2} scale={[1, 1, 1]} />
    </>
  );
};
