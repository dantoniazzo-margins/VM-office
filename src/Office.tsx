import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics } from "@react-three/rapier";
import { Floor } from "_entities/floor";
import { BoundingWalls } from "_widgets/BoundingWalls";
import { DevSpace } from "_widgets/DevSpace";
import { MiddleSpace } from "_widgets/MiddleSpace";
import { DesignSpace } from "_widgets/DesignSpace";
import { Reception } from "_widgets/Reception";
import { Lounge } from "_widgets/Lounge";
import { Person, Player } from "_features/player";
import {
  MAIN_FLOOR_LENGTH,
  MAIN_FLOOR_WIDTH,
  MAIN_FLOOR_HEIGHT,
} from "_entities/floor";
import { Vector3 } from "three";
import { Kitchen } from "_widgets/Kitchen";
import { PMSpace } from "_widgets/PMSpace";
import { GreenConf } from "_widgets/GreenConf";
import { Ceiling } from "_widgets/Ceiling";
import { useControls } from "leva";
import { PerspectiveCamera } from "@react-three/drei";

export default function Office() {
  const controls = useControls("view", {
    orbitControls: false,
  });
  return (
    <>
      <PerspectiveCamera makeDefault position={[5, 5, -5]} fov={75} />
      {process.env.NODE_ENV === "development" && (
        <Perf position="bottom-left" />
      )}
      {controls.orbitControls && <OrbitControls makeDefault />}

      <ambientLight intensity={1.5} />

      <Physics gravity={[0, -9.81, 0]}>
        <Floor
          size={
            new Vector3(MAIN_FLOOR_WIDTH, MAIN_FLOOR_HEIGHT, MAIN_FLOOR_LENGTH)
          }
        />
        <Ceiling width={MAIN_FLOOR_LENGTH} length={MAIN_FLOOR_WIDTH} />
        <BoundingWalls />
        <DevSpace />
        <PMSpace />
        <MiddleSpace />
        <DesignSpace />
        <Reception />
        <Lounge />
        <Kitchen />
        <GreenConf />
        {!controls.orbitControls && <Player />}
        {/*  <Person
          keys={() => {
            return {};
          }}
          initialPosition={new Vector3(-4, 0, 17)}
        /> */}
      </Physics>
    </>
  );
}
