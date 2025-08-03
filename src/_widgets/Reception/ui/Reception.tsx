import { Wall } from '_entities/wall';
import { ReceptionDesk } from '_entities/reception';
import { CeilingLight } from '_features/light';
import { CustomAnimationWithPhysics } from '_features/animation';
import { RECEPTION_DESK_SIZE } from '_entities/reception/lib/constants';

export const Reception = () => {
  return (
    <group position-z={17.5}>
      <Wall length={2} rotate color="#2f2e2e" />
      <ReceptionDesk position={[-1.7, -RECEPTION_DESK_SIZE.y, 0]} />
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[-0.7, -1, 0]}
        rotation={[0, -Math.PI * 0.5, 0]}
        url={'/chair.glb'}
        scale={1}
      />
      <CeilingLight position-x={-3.7} position-z={0} />
      <CeilingLight position-x={-3.7} position-z={5} />
    </group>
  );
};
