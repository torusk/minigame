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
        fontSize: "36px", // 1.5倍に大きくしたので、フォントサイズも1.5倍に
        backgroundColor: "white",
        borderRadius: "50%",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      🍽️
    </div>
  );
}

export default Player;
