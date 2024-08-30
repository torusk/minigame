import React from "react";
import Player from "./Player";
import Enemy from "./Enemy";
import Plate from "./Plate";
import { Enemy as EnemyType, Plate as PlateType } from "../types";
import { PLAYER_WIDTH } from "../constants";

interface GameAreaProps {
  playerX: number;
  enemies: EnemyType[];
  plates: PlateType[];
}

const GameArea: React.FC<GameAreaProps> = ({ playerX, enemies, plates }) => {
  const gameAreaRef = React.useRef<HTMLDivElement>(null);

  const clampPlayerX = (x: number): number => {
    if (!gameAreaRef.current) return x;
    const gameAreaWidth = gameAreaRef.current.clientWidth;
    return Math.max(0, Math.min(x, gameAreaWidth - PLAYER_WIDTH));
  };

  return (
    <div className="game-area" ref={gameAreaRef}>
      <Player x={clampPlayerX(playerX)} />
      {enemies.map((enemy, index) => (
        <Enemy
          key={`enemy-${index}`}
          x={enemy.x}
          y={enemy.y}
          type={enemy.type}
        />
      ))}
      {plates.map((plate, index) => (
        <Plate key={`plate-${index}`} x={plate.x} y={plate.y} />
      ))}
    </div>
  );
};

export default GameArea;
