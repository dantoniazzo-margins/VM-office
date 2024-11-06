import { Person } from './Person';
import { Vehicle } from './Vehicle';
import { useControls } from 'leva';

export const Player = () => {
  const controls = useControls('player', {
    drive: false,
  });
  return controls.drive ? <Vehicle /> : <Person />;
};
