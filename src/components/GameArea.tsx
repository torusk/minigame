import React, { useRef, useEffect, useState } from "react";
import Player from "./Player";
import Enemy from "./Enemy";
import Plate from "./Plate";
import { Enemy as EnemyType, Plate as PlateType } from "../types";
import { PLAYER_WIDTH, ENEMY_SIZE, PLATE_SIZE } from "../constants";

interface GameAreaProps {
  playerX: number;
  enemies: EnemyType[];
  plates: PlateType[];
}

const GameArea: React.FC<GameAreaProps> = ({ playerX, enemies, plates }) => {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [areaSize, setAreaSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (gameAreaRef.current) {
        setAreaSize({
          width: gameAreaRef.current.clientWidth,
          height: gameAreaRef.current.clientHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const clampPosition = (x: number, y: number, size: number) => ({
    x: Math.max(0, Math.min(x, areaSize.width - size)),
    y: Math.max(0, Math.min(y, areaSize.height - size)),
  });

  return (
    <div className="game-area" ref={gameAreaRef}>
      <Player
        x={Math.max(0, Math.min(playerX, areaSize.width - PLAYER_WIDTH))}
      />

      {enemies.map((enemy, index) => {
        const { x, y } = clampPosition(enemy.x, enemy.y, ENEMY_SIZE);
        return <Enemy key={`enemy-${index}`} x={x} y={y} type={enemy.type} />;
      })}

      {plates.map((plate, index) => {
        const { x, y } = clampPosition(plate.x, plate.y, PLATE_SIZE);
        return <Plate key={`plate-${index}`} x={x} y={y} />;
      })}
    </div>
  );
};

export default GameArea;
