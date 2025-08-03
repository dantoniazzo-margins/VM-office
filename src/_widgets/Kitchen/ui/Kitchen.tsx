import { Floor, MAIN_FLOOR_HEIGHT, MAIN_FLOOR_LENGTH } from '_entities/floor';
import { Vector3 } from 'three';
import { KITCHEN_LENGTH, KITCHEN_WIDTH } from '../lib/constants';
import { LEFT_WALL_X_POSITION } from '_widgets/BoundingWalls/ui/LeftWall';
import { Wall, WALL_WIDTH } from '_entities/wall';
import { CeilingLight } from '_features/light';
import { Ceiling } from '_widgets/Ceiling';
import {
  CustomAnimation,
  CustomAnimationWithPhysics,
} from '_features/animation';
import { LargePillar } from '_entities/pillar';

export const KITCHEN_SHORT_WALL_LEGTH = KITCHEN_WIDTH - WALL_WIDTH / 2;

export const KITCHEN_FIRST_WALL_Z = KITCHEN_LENGTH / 5;
export const KITCHEN_SECOND_WALL_Z = -KITCHEN_LENGTH / 2.7;

export const KITCHEN_THIRD_WALL_LENGTH =
  KITCHEN_FIRST_WALL_Z - KITCHEN_SECOND_WALL_Z - WALL_WIDTH;
export const KITCHEN_THIRD_WALL_Z =
  -KITCHEN_LENGTH / 2 + KITCHEN_THIRD_WALL_LENGTH / 2 + WALL_WIDTH / 2;

export const KITCHEN_SMALL_WALL_LENGTH = KITCHEN_SHORT_WALL_LEGTH / 4;
export const KITCHEN_LARGE_WALL_LENGTH = KITCHEN_SHORT_WALL_LEGTH / 2.15;

export const Kitchen = () => {
  return (
    <group
      position={[
        LEFT_WALL_X_POSITION - KITCHEN_WIDTH / 2,
        0,
        MAIN_FLOOR_LENGTH / 2 - KITCHEN_LENGTH / 3,
      ]}
    >
      <Ceiling width={KITCHEN_LENGTH} length={KITCHEN_WIDTH} />
      <CeilingLight position-x={-2} />
      <Floor
        size={new Vector3(KITCHEN_WIDTH, MAIN_FLOOR_HEIGHT, KITCHEN_LENGTH)}
      />
      <Wall
        length={KITCHEN_SHORT_WALL_LEGTH}
        position-x={-WALL_WIDTH / 4}
        position-z={KITCHEN_SECOND_WALL_Z}
        color="#c0b309"
      />
      <Wall
        length={KITCHEN_SHORT_WALL_LEGTH}
        position-x={-WALL_WIDTH / 4}
        position-z={KITCHEN_FIRST_WALL_Z}
        color="#3b3b3b"
      />
      <Wall
        length={KITCHEN_THIRD_WALL_LENGTH}
        position-x={-KITCHEN_WIDTH / 2}
        position-z={KITCHEN_THIRD_WALL_Z}
        rotate
        opacity={0.5}
      />
      <Wall
        length={KITCHEN_SMALL_WALL_LENGTH}
        position-x={
          -KITCHEN_WIDTH / 2 + WALL_WIDTH / 2 + KITCHEN_SMALL_WALL_LENGTH / 2
        }
        position-z={-4}
        color="#3b3b3b"
      />
      <Wall
        length={KITCHEN_LARGE_WALL_LENGTH}
        position-x={
          KITCHEN_WIDTH / 2 - WALL_WIDTH / 2 - KITCHEN_LARGE_WALL_LENGTH / 2
        }
        position-z={-4}
        color="#3b3b3b"
      />
      <LargePillar
        rotation={[0, -Math.PI * 0.05, 0]}
        position={[-0.4, -1, 1.5]}
        scale={0.2}
      />
      {/* Far table */}
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[-2.5, -1, 0.3]}
        rotation={[0, Math.PI, 0]}
        url={'/kitchen_table.glb'}
        scale={0.0125}
      />
      {/* Left table */}
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[1.5, -1, -2.5]}
        rotation={[0, Math.PI / 2.1, 0]}
        url={'/kitchen_table.glb'}
        scale={0.0125}
      />
      {/* Right table */}
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[3.5, -1, -2.4]}
        rotation={[0, Math.PI / 2.1, 0]}
        url={'/kitchen_table.glb'}
        scale={0.0125}
      />
      {/* Kitchen sink */}
      <CustomAnimationWithPhysics
        type="fixed"
        playedAnimation="mixamo.com"
        position={[1, -1, -5.35]}
        rotation={[0, 0, 0]}
        url={'/kitchen_sink.glb'}
        scale={[1, 1, 1.3]}
      />
      {/* Kitchen cupboards */}
      {/* Top */}
      <CustomAnimation
        playedAnimation="mixamo.com"
        position={[1.2, 0.91, -5.97]}
        rotation={[0, -Math.PI / 2, 0]}
        url={'/kitchen_cupboards.glb'}
        scale={[1.22, 0.9, 1]}
      />
      <CustomAnimation
        playedAnimation="mixamo.com"
        position={[1.2, 0.91, -4.75]}
        rotation={[0, -Math.PI / 2, 0]}
        url={'/kitchen_cupboards.glb'}
        scale={[1.22, 0.9, 1]}
      />
      {/* Bottom */}
      <CustomAnimation
        playedAnimation="mixamo.com"
        position={[1.2, 0.42, -5.97]}
        rotation={[0, -Math.PI / 2, 0]}
        url={'/kitchen_cupboards.glb'}
        scale={[1.22, 0.9, 1]}
      />
      <CustomAnimation
        playedAnimation="mixamo.com"
        position={[1.2, 0.42, -4.75]}
        rotation={[0, -Math.PI / 2, 0]}
        url={'/kitchen_cupboards.glb'}
        scale={[1.22, 0.9, 1]}
      />
      {/* Fridge */}
      <CustomAnimationWithPhysics
        type="fixed"
        playedAnimation="mixamo.com"
        position={[1, -0.37, -6.93]}
        rotation={[Math.PI, Math.PI, 0]}
        url={'/fridge.glb'}
        scale={[0.2, 0.15, 0.19]}
      />
      <CustomAnimationWithPhysics
        type="fixed"
        playedAnimation="mixamo.com"
        position={[1, 0.83, -6.93]}
        rotation={[Math.PI, Math.PI, 0]}
        url={'/fridge.glb'}
        scale={[0.2, 0.136, 0.19]}
      />
      {/* Kitchen coffee area */}
      <mesh position={[-4.2, -0.25, -5.7]} receiveShadow>
        <boxGeometry args={[1.5, 0.1, 3.2]} />
        <meshPhongMaterial color={'#3b3b3b'} />
      </mesh>
      <mesh position={[-4.35, 0.5, -6.4]} receiveShadow>
        <boxGeometry args={[1.2, 0.075, 1.6]} />
        <meshPhongMaterial color={'#3b3b3b'} />
      </mesh>
      {/* Coffee machine */}
      <CustomAnimation
        playedAnimation="mixamo.com"
        position={[-4, -0.2, -4.8]}
        rotation={[0, Math.PI / 2, 0]}
        url={'/coffee_machine.glb'}
        scale={3}
      />
      {/* Trash can */}
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[-3, -1, -6.9]}
        rotation={[0, 0, 0]}
        url={'/trash_can.glb'}
        scale={0.0023}
      />
      {/* Recycle bins */}
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[-4, -1, -2.1]}
        rotation={[0, Math.PI / 1.5, 0]}
        url={'/recycle_bin_glass.glb'}
        scale={1.2}
      />
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[-4, -1, -2.7]}
        rotation={[0, Math.PI / 1.5, 0]}
        url={'/recycle_bin_plastic.glb'}
        scale={1.2}
      />
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[-4, -1, -3.3]}
        rotation={[0, Math.PI / 1.5, 0]}
        url={'/recycle_bin_paper.glb'}
        scale={1.2}
      />
    </group>
  );
};
