import { useOthers } from "@liveblocks/react/suspense";
export const NumOfPlayers = () => {
  const others = useOthers();
  const userCount = others.length;
  return (
    <div
      style={{
        position: "absolute",
        left: 5,
        top: 5,
        background: "black",
        color: "white",
        padding: 10,
      }}
    >
      Num of players: {userCount}
    </div>
  );
};
