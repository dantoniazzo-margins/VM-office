interface CeilingLightProps {
  'position-x'?: number;
  'position-z'?: number;
}

export const CeilingLight = (props: CeilingLightProps) => {
  return (
    <pointLight
      castShadow
      color={'white'}
      intensity={50}
      position-y={1.2}
      position-x={props['position-x']}
      position-z={props['position-z']}
    />
  );
};
