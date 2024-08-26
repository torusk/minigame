import React from "react";
import { PLAYER_WIDTH, PLAYER_HEIGHT } from "../constants";

function Player({ x }) {
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
        fontSize: "24px",
      }}
    >
      🍽️
    </div>
  );
}

export default Player;