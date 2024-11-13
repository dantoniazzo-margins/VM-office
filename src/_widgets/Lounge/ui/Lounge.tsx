import { Couch } from "_entities/couch";
import { Pillar } from "_entities/pillar";
import { PS5Contoller } from "_entities/ps5";
import { Shelf } from "_entities/shelf";
import { TVSetup } from "_widgets/TVSetup";
import { RockingChair } from "_entities/rocking-chair";
import { BeanBag } from "_entities/bean-bag";
import { MAIN_FLOOR_WIDTH } from "_entities/floor";

export const Lounge = () => {
  return (
    <group position-z={17}>
      <Pillar position-z={0} position-x={4.75} />
      <Shelf position-z={0} position-x={0.2} scale={[3.4, 0.8, 1]} />
      <Couch position-z={5.5} position-x={3} />
      <Couch
        position-z={6.5}
        position-x={6}
        rotation={[0, -Math.PI * 0.5, 0]}
      />
      <TVSetup position-z={7.4} position-x={2.9} />
      <PS5Contoller
        position-z={4.5}
        position-x={2}
        position-y={0}
        rotation-x={Math.PI * 0.5}
        rotation-z={Math.PI * 0.1}
      />
      <PS5Contoller
        position-z={4.5}
        position-x={2.5}
        position-y={0}
        rotation-x={Math.PI * 0.5}
        rotation-z={-Math.PI * 0.3}
      />
      <RockingChair position-z={4.8} rotation={[0, Math.PI * 0.4, 0]} />
      <RockingChair position-z={6.2} rotation={[0, Math.PI * 0.6, 0]} />
      {/*   <BeanBag
        position={[MAIN_FLOOR_WIDTH / 2.5, 0, 6]}
        rotation={[0, -Math.PI * 0.5, 0]}
      /> */}
    </group>
  );
};
