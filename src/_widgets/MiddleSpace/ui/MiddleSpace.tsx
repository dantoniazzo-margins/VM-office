import { Desk, DESK_SIZE } from '_entities/desk';
import { MAIN_FLOOR_HEIGHT, MAIN_FLOOR_WIDTH } from '_entities/floor';
import { Wall, WALL_HEIGHT, WALL_WIDTH } from '_entities/wall';
import { Whiteboard } from '_entities/whiteboard';
import { FullDeskGroup } from '_widgets/FullDeskGroup';
import { CeilingLight } from '_features/light';
import { CustomAnimationWithPhysics } from '_features/animation';

export const MIDDLE_SPACE_OFFSET = -7;

export const DESIGNER_WALL_Z = 11.5;

export const CLOSE_TO_DEV_SPACE_WALL_LENGTH = 4;
export const RED_CONF_LENGTH = 8;

export const HR_OFFICE_SMALL_LENGTH = 3.5;
export const HR_OFFICE_GLASS_LENGTH = 2;
export const HR_OFFICE_Z = 9.8;

export const MiddleSpace = () => {
  return (
    <group position-z={MIDDLE_SPACE_OFFSET}>
      {/* Close to dev space wall */}
      <CeilingLight position-x={1.5} position-z={3} />
      <CeilingLight position-x={-3.7} position-z={3} />
      <Wall
        length={CLOSE_TO_DEV_SPACE_WALL_LENGTH}
        position-x={MAIN_FLOOR_WIDTH / 3 - CLOSE_TO_DEV_SPACE_WALL_LENGTH / 2}
        opacity={0.4}
        width={0.1}
        position-z={-0.05}
      />
      {/* Long glass wall */}
      <Wall
        length={RED_CONF_LENGTH}
        rotate
        position-x={-MAIN_FLOOR_WIDTH / 3 / 2}
        position-z={4}
        opacity={0.4}
      />

      {/* Long red wall */}
      <Wall
        length={RED_CONF_LENGTH - WALL_WIDTH / 2}
        rotate
        position-x={MAIN_FLOOR_WIDTH / 3 - WALL_WIDTH / 2}
        position-z={4 - WALL_WIDTH / 4}
        color="#971a1a"
      />
      {/* Middle wall */}
      <Wall length={8} position-x={MAIN_FLOOR_WIDTH / 3 / 2} position-z={8} />

      {/* Ana and Dora office */}
      <FullDeskGroup rotation={[0, Math.PI * 0.5, 0]} position={[2, 0, 4]}>
        {[Desk, Desk]}
      </FullDeskGroup>
      {/* Bottom right */}
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[2.5, -1, 6]}
        rotation={[0, -Math.PI / 2, 0]}
        url={'/chair_2.glb'}
        scale={1}
      />
      {/* Top right */}
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[2.5, -1, 4]}
        rotation={[0, -Math.PI / 2, 0]}
        url={'/chair_2.glb'}
        scale={1}
      />
      {/* Top left */}
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[0.5, -1, 2]}
        rotation={[0, Math.PI / 2, 0]}
        url={'/chair_2.glb'}
        scale={1}
      />
      {/* Bottom left */}
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[0.5, -1, 4]}
        rotation={[0, Math.PI / 2, 0]}
        url={'/chair_2.glb'}
        scale={1}
      />
      {/* Bottom */}
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[0.7, -1, 6.5]}
        rotation={[0, Math.PI, 0]}
        url={'/chair_2.glb'}
        scale={1}
      />
      <CeilingLight position-x={-3.7} position-z={10} />
      <CeilingLight position-x={1.5} position-z={10} />
      <Whiteboard position={[-1, 0, 7]} rotation={[0, Math.PI * 0.25, 0]} />
      {/* Dora and Ana office door */}
      <Wall
        length={HR_OFFICE_GLASS_LENGTH}
        rotate
        position-x={-MAIN_FLOOR_WIDTH / 3 / 2}
        position-z={HR_OFFICE_Z - HR_OFFICE_GLASS_LENGTH / 2 + WALL_WIDTH}
        opacity={0.4}
        width={WALL_WIDTH}
      />
      {/* HR wall close to PM office */}
      <Wall
        length={HR_OFFICE_SMALL_LENGTH}
        rotate
        position-x={MAIN_FLOOR_WIDTH / 2 - WALL_WIDTH / 2}
        position-z={HR_OFFICE_Z}
      />
      {/* HR Office content */}
      <FullDeskGroup position={[2, 0, DESIGNER_WALL_Z - DESK_SIZE.z]}>
        {[Desk, Desk]}
      </FullDeskGroup>
      {/* Top */}
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[3, -1, DESIGNER_WALL_Z - DESK_SIZE.z * 0.6]}
        rotation={[0, Math.PI, 0]}
        url={'/chair.glb'}
        scale={1}
      />
      {/* Bottom */}
      <CustomAnimationWithPhysics
        playedAnimation="mixamo.com"
        position={[1, -1, DESIGNER_WALL_Z - DESK_SIZE.z * 0.6]}
        rotation={[0, Math.PI, 0]}
        url={'/chair.glb'}
        scale={1}
      />
      {/* Designer wall */}
      <Wall
        length={8}
        position-x={MAIN_FLOOR_WIDTH / 3 / 2}
        position-z={DESIGNER_WALL_Z}
      />
      <mesh
        receiveShadow
        position-x={MAIN_FLOOR_WIDTH / 3 / 2}
        position-y={MAIN_FLOOR_HEIGHT / 2}
        position-z={DESIGNER_WALL_Z + WALL_WIDTH / 2 + 0.01}
      >
        <planeGeometry args={[8, WALL_HEIGHT]} />
        <meshPhongMaterial color={'#3e3e3e'} />
      </mesh>
    </group>
  );
};
