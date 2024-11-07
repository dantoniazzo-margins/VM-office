interface Props {
  children: ((props: JSX.IntrinsicElements['group']) => JSX.Element)[];
}

const deskProps: { [key: number]: object } = {
  0: { ['position-x']: -3 },
  1: { ['position-x']: -0.97 },
  2: { ['position-x']: -0.97, ['position-z']: 1.03 },
  3: { ['position-x']: -3, ['position-z']: 1.03 },
};

export const FullDeskGroup = (props: Props) => {
  return (
    <group position-z={3}>
      {props.children.map((Desk, index) => {
        return <Desk key={index} {...deskProps[index]} />;
      })}
    </group>
  );
};
