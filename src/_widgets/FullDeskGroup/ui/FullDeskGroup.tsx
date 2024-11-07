import { DESK_SIZE } from "_entities/desk";
import { omit } from "lodash";

interface CustomProps {
  children: ((props: JSX.IntrinsicElements["group"]) => JSX.Element)[];
}
interface GroupProps extends Omit<JSX.IntrinsicElements["group"], "children"> {}
type Props = GroupProps & CustomProps;

const GAP = 0.05;

const deskProps: { [key: number]: object } = {
  0: {
    ["position-x"]: -DESK_SIZE.x / 2 - GAP / 2,
    ["position-z"]: -DESK_SIZE.z / 2 - GAP / 2,
  },
  1: {
    ["position-x"]: DESK_SIZE.x / 2 + GAP / 2,
    ["position-z"]: -DESK_SIZE.z / 2 - GAP / 2,
  },
  2: {
    ["position-x"]: -DESK_SIZE.x / 2 - GAP / 2,
    ["position-z"]: DESK_SIZE.z / 2 + GAP / 2,
  },
  3: {
    ["position-x"]: DESK_SIZE.x / 2 + GAP / 2,
    ["position-z"]: DESK_SIZE.z / 2 + GAP / 2,
  },
};

export const FullDeskGroup = (props: Props) => {
  const { children, ...groupProps } = props;
  return (
    <group {...groupProps}>
      {children.map((Desk, index) => {
        return <Desk key={index} {...deskProps[index]} />;
      })}
    </group>
  );
};
