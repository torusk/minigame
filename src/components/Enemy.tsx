import React from "react";
import { ENEMY_SIZE, CANDY_TYPES } from "../constants";

interface EnemyProps {
  x: number;
  y: number;
  type: number;
}

const Enemy: React.FC<EnemyProps> = ({ x, y, type }) => {
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
        fontSize: "45px",
      }}
    >
      {CANDY_TYPES[type].emoji}
    </div>
  );
};

export default Enemy;
