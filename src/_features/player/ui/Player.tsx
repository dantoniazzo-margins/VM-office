import { useKeyboardControls } from "@react-three/drei";
import { Person } from "./Person";
import { Vehicle } from "./Vehicle";
import { useControls } from "leva";
import { Vector3 } from "three";

export const Player = () => {
  const controls = useControls("player", {
    drive: false,
  });
  const [_, getKeys] = useKeyboardControls();

  return controls.drive ? (
    <Vehicle />
  ) : (
    <Person
      keys={getKeys}
      isLocalUser
      initialPosition={new Vector3(-4, 0, 24)}
    />
  );
};
