import React from "react";
import { ENEMY_SIZE } from "../constants";

const candyEmojis = ["🍬", "🍭", "🍫", "🍪", "🧁", "🍩"];

function Enemy({ x, y, type }) {
  return (
    <div
      className="enemy"
      style={{
        left: x,
        top: y,
        width: ENEMY_SIZE,
        height: ENEMY_SIZE,
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "50px",
      }}
    >
      {candyEmojis[type]}
    </div>
  );
}

export default Enemy;
