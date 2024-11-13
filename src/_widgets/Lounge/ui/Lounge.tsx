import { Couch } from "_entities/couch";
import { Pillar } from "_entities/pillar";
import { PS5Contoller } from "_entities/ps5";
import { Shelf } from "_entities/shelf";
import { TV } from "_entities/tv";
import { TvTable } from "_entities/tv-table";
import { TVSetup } from "_widgets/TVSetup";

export const Lounge = () => {
  return (
    <group position-z={17}>
      <Pillar position-z={0} position-x={4.75} />
      <Shelf position-z={0} position-x={0.2} scale={[3.4, 0.8, 1]} />
      <Couch position-z={4} position-x={2.8} />
      <TVSetup position-z={7.4} position-x={2.9} />
      <PS5Contoller
        position-z={4}
        position-x={2}
        position-y={-0.36}
        rotation-x={Math.PI * 0.5}
        rotation-z={Math.PI * 0.1}
      />
      <PS5Contoller
        position-z={4}
        position-x={2.5}
        position-y={-0.36}
        rotation-x={Math.PI * 0.5}
        rotation-z={-Math.PI * 0.3}
      />
    </group>
  );
};
