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
  const scale = Math.min(width / 800, height / 600);
  const scaledWidth = 1200 * scale;
  const scaledHeight = 800 * scale;

  // プレイヤーの位置を制限する関数
  const clampPlayerX = (x: number) =>
    Math.max(0, Math.min(x, scaledWidth - 40)); // 50はプレイヤーの幅

  return (
    <div
      className="game-area"
      style={{
        width: scaledWidth,
        height: scaledHeight,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Player x={clampPlayerX(playerX * scale)} />
      {enemies.map((enemy, index) => (
        <Enemy
          key={`enemy-${index}`}
          x={enemy.x * scale}
          y={enemy.y * scale}
          type={enemy.type}
        />
      ))}
      {plates.map((plate, index) => (
        <Plate key={`plate-${index}`} x={plate.x * scale} y={plate.y * scale} />
      ))}
    </div>
  );
};

export default GameArea;
