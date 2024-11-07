import { Desk } from '_entities/desk';
import { Character } from '_entities/character';

export const DesignSpace = () => {
  return (
    <group position-z={9}>
      <Desk position-x={-3} />
      <Character
        rotation={[0, Math.PI * 0.5, 0]}
        position={[-0.6, 1, 2]}
        url="/sara.glb"
        collider="hull"
      />
    </group>
  );
};
