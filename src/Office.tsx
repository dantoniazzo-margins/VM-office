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
import { Player } from "_features/player";
import {
  MAIN_FLOOR_LENGTH,
  MAIN_FLOOR_WIDTH,
  MAIN_FLOOR_HEIGHT,
} from "_entities/floor";
import { Vector3 } from "three";
import { Kitchen } from "_widgets/Kitchen";
import { PMSpace } from "_widgets/PMSpace";
import { GreenConf } from "_widgets/GreenConf";
import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { PerspectiveCamera } from "@theatre/r3f";
import { Ceiling } from "_widgets/Ceiling";

studio.initialize();
studio.extend(extension);
// our Theatre.js project sheet, we'll use this later
const demoSheet = getProject("Demo Project").sheet("Demo Sheet");

export default function Office() {
  return (
    <SheetProvider sheet={demoSheet}>
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[5, 5, -5]}
        fov={75}
      />
      {process.env.NODE_ENV === "development" && <Perf position="top-left" />}

      <OrbitControls makeDefault />

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
        {/* <Player /> */}
      </Physics>
    </SheetProvider>
  );
}
