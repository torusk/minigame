import React from "react";
import Player from "./Player";
import Enemy from "./Enemy";
import Plate from "./Plate";
import { Enemy as EnemyType, Plate as PlateType } from "../types";

interface GameAreaProps {
  width: number;
  height: number;
  playerX: number;
  enemies: EnemyType[];
  plates: PlateType[];
}

const GameArea: React.FC<GameAreaProps> = ({
  width,
  height,
  playerX,
  enemies,
  plates,
}) => {
  return (
    <div className="game-area" style={{ width, height }}>
      <Player x={playerX} />
      {enemies.map((enemy, index) => (
        <Enemy key={`enemy-${index}`} {...enemy} />
      ))}
      {plates.map((plate, index) => (
        <Plate key={`plate-${index}`} {...plate} />
      ))}
    </div>
  );
};

export default GameArea;
