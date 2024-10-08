import { Couch } from '_entities/couch';
import { Pillar } from '_entities/pillar';
import { Shelf } from '_entities/shelf';
import { TV } from '_entities/tv';
import { TvTable } from '_entities/tv-table';

export const Lounge = () => {
  return (
    <>
      <Pillar position-z={14} position-x={4.75} />
      <Shelf position-z={14} position-x={0.2} scale={[3.4, 0.8, 1]} />
      <Couch position-z={17} position-x={2.8} />
      <TV
        position-z={19.3}
        position-x={2.9}
        position-y={0.15}
        rotation-y={Math.PI}
      />
      <TvTable position-z={18.5} position-x={3.2} scale={[1.4, 1, 1]} />
    </>
  );
};
