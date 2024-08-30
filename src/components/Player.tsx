import React from "react";
import { PLAYER_WIDTH, PLAYER_HEIGHT } from "../constants";

interface PlayerProps {
  x: number;
}

const Player: React.FC<PlayerProps> = ({ x }) => {
  return (
    <div
      className="player"
      style={{
        left: x,
        bottom: 0,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "75px",
      }}
    >
      🍽️
    </div>
  );
};

export default Player;
