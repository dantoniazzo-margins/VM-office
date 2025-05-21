interface CeilingLightProps {
  "position-x"?: number;
  "position-z"?: number;
}

export const CeilingLight = (props: CeilingLightProps) => {
  return (
    <pointLight
      color={"white"}
      intensity={5}
      position-y={1}
      position-x={props["position-x"]}
      position-z={props["position-z"]}
    />
  );
};
