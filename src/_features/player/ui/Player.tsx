import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { useThirdPersonCamera } from "../model/third-person.camera";
import { usePlayerMovement } from "../model/player.movement";
import { INITIAL_POSITION } from "../lib/constants";
import { Car } from "_entities/car";
import { Character } from "_entities/character";
import { Scooter } from "_entities/scooter/ui/Scooter";

export const Player = () => {
  const body = useRef<RapierRigidBody | null>(null);
  useThirdPersonCamera({ target: body.current });
  usePlayerMovement({ target: body.current });

  return (
    <Character
      url="/bruno_on_bike.glb"
      collider="trimesh"
      position={INITIAL_POSITION}
      ref={body}
    />
    /* <Car position={INITIAL_POSITION} ref={body} /> */
    /* <Scooter position={INITIAL_POSITION} ref={body} /> */
  );
};
