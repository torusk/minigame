import React from "react";
import Player from "./Player";
import Enemy from "./Enemy";

function GameArea({ width, height, playerX, enemies }) {
  return (
    <div className="game-area" style={{ width, height }}>
      <Player x={playerX} />
      {enemies.map((enemy, index) => (
        <Enemy key={`enemy-${index}`} {...enemy} />
      ))}
    </div>
  );
}

export default GameArea;
