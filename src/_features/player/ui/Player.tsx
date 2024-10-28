import { useRapier, RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useThirdPersonCamera } from "../model/third-person.camera";
import { usePlayerMovement } from "../model/player.movement";

export const Player = () => {
  const body = useRef<RapierRigidBody | null>(null);
  useThirdPersonCamera({ target: body.current });
  usePlayerMovement({ target: body.current });

  const getPlayer = () => {
    return body.current;
  };

  const reset = () => {
    const player = getPlayer();
    if (!player) return;
    player.setTranslation({ x: -4, y: 1, z: 19.6 }, true);
    player.setLinvel({ x: 0, y: 0, z: 0 }, true);
    player.setAngvel({ x: 0, y: 0, z: 0 }, true);
  };

  useEffect(() => {
    reset();
  }, []);

  return (
    <RigidBody
      ref={body}
      canSleep={false}
      colliders="ball"
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      mass={5}
      position={[0, 1, 0]}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.2, 1]} />
        <meshStandardMaterial flatShading color="mediumpurple" />
      </mesh>
    </RigidBody>
  );
};
