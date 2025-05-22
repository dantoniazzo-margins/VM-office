import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Office from "./Office";
import { KeyboardControls } from "@react-three/drei";
import ThirdPersonTest from "_pages/ThirdPersonTest/ThirdPersonTest";
import WalkingTest from "_pages/WalkingTest/WalkingTest";
import DrivingGame from "_pages/DrivingTest/DrivingTest";
import { RaceTrack } from "_pages/DrivingTest/Racetrack";
import * as THREE from "three";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { NumOfPlayers } from "_features/players";
import { keys } from "_features/controls";

const rootContainer = document.querySelector("#root");
const keyboardControls = Object.values(keys).map((value) => value);
if (rootContainer) {
  const root = ReactDOM.createRoot(rootContainer);

  root.render(
    <LiveblocksProvider publicApiKey="pk_dev_MLbdFOCdYIBnJw1RRR9-j5jYWjMKGcuqTH0KhPK2gZSBepVZKwqGHaKOp-XdcKRK">
      <RoomProvider id="office">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <KeyboardControls map={keyboardControls}>
            <Canvas shadows>
              <Office />
            </Canvas>
            <NumOfPlayers />
          </KeyboardControls>
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
