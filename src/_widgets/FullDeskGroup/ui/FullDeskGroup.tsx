import { DESK_SIZE } from '_entities/desk';
import { CustomAnimationWithPhysics } from '_features/animation';
import { omit } from 'lodash';

interface CustomProps {
  children: ((props: JSX.IntrinsicElements['group']) => JSX.Element)[];
  verticalFirst?: boolean;
}
interface GroupProps extends Omit<JSX.IntrinsicElements['group'], 'children'> {}
type Props = GroupProps & CustomProps;

export const GAP = 0.05;

const horizontalFirstDeskProps: { [key: number]: object } = {
  0: {
    ['position-x']: -DESK_SIZE.x / 2 - GAP / 2,
    ['position-z']: -DESK_SIZE.z / 2 - GAP / 2,
  },
  1: {
    ['position-x']: DESK_SIZE.x / 2 + GAP / 2,
    ['position-z']: -DESK_SIZE.z / 2 - GAP / 2,
  },
  2: {
    ['position-x']: -DESK_SIZE.x / 2 - GAP / 2,
    ['position-z']: DESK_SIZE.z / 2 + GAP / 2,
  },
  3: {
    ['position-x']: DESK_SIZE.x / 2 + GAP / 2,
    ['position-z']: DESK_SIZE.z / 2 + GAP / 2,
  },
  4: {
    ['position-x']: -DESK_SIZE.x - DESK_SIZE.x / 2 - GAP,
    ['position-z']: DESK_SIZE.z / 2 + GAP / 2,
  },
  5: {
    ['position-x']: -DESK_SIZE.x - DESK_SIZE.x / 2 - GAP,
    ['position-z']: -DESK_SIZE.z / 2 - GAP / 2,
  },
};

const verticalFirstDeskProps: { [key: number]: object } = {
  0: {
    ['position-x']: -DESK_SIZE.x / 2 - GAP / 2,
    ['position-z']: -DESK_SIZE.z / 2 - GAP / 2,
  },
  1: {
    ['position-x']: -DESK_SIZE.x / 2 - GAP / 2,
    ['position-z']: DESK_SIZE.z / 2 + GAP / 2,
  },
  2: {
    ['position-x']: DESK_SIZE.x / 2 + GAP / 2,
    ['position-z']: -DESK_SIZE.z / 2 - GAP / 2,
  },
  3: {
    ['position-x']: DESK_SIZE.x / 2 + GAP / 2,
    ['position-z']: DESK_SIZE.z / 2 + GAP / 2,
  },
  4: {
    ['position-x']: -DESK_SIZE.x - DESK_SIZE.x / 2 - GAP,
    ['position-z']: DESK_SIZE.z / 2 + GAP / 2,
  },
  5: {
    ['position-x']: -DESK_SIZE.x - DESK_SIZE.x / 2 - GAP,
    ['position-z']: -DESK_SIZE.z / 2 - GAP / 2,
  },
};

export const FullDeskGroup = (props: Props) => {
  const { children, ...groupProps } = props;
  return (
    <group {...groupProps}>
      {children.map((Desk, index) => {
        const getProps = props.verticalFirst
          ? { ...verticalFirstDeskProps[index] }
          : { ...horizontalFirstDeskProps[index] };
        return <Desk key={index} {...getProps} />;
      })}
    </group>
  );
};
