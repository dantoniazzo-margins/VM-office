import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { useThirdPersonCamera } from "../model/third-person.camera";
import { usePlayerMovement } from "../model/player.movement";
import { INITIAL_POSITION } from "../lib/constants";
import { Car, ThreeCar } from "_entities/car";
import { Character } from "_entities/character";
import { Scooter } from "_entities/scooter/ui/Scooter";

export const Player = () => {
  const body = useRef<RapierRigidBody | null>(null);
  useThirdPersonCamera({ target: body.current });
  usePlayerMovement({ target: body.current });

  return (
    /* <Character
      url="/bruno_on_bike.glb"
      collider="hull"
      rotation={[0, Math.PI * 0.5, 0]}
      position={INITIAL_POSITION}
      ref={body}
    /> */
    /* <Car position={INITIAL_POSITION} ref={body} /> */
    <ThreeCar />
    /* <Scooter position={INITIAL_POSITION} ref={body} /> */
  );
};
