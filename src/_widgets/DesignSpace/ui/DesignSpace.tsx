import { Desk } from '_entities/desk';

export const DesignSpace = () => {
  return (
    <group position-z={8}>
      <Desk rotation-y={Math.PI * 0.5} />
      <Desk position-x={1.75} rotation-y={Math.PI * 0.5} />
      <Desk position-x={3.5} rotation-y={Math.PI * 0.5} />

      <Desk position-z={1} rotation-y={Math.PI * 0.5} />
      <Desk position-z={1} position-x={1.75} rotation-y={Math.PI * 0.5} />
      <Desk position-z={1} position-x={3.5} rotation-y={Math.PI * 0.5} />
    </group>
  );
};
