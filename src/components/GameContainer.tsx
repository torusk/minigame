import React, { useEffect, useCallback } from "react";
import GameArea from "./GameArea";
import GameInfo from "./GameInfo";
import ControlButtons from "./ControlButtons";
import { Enemy, Plate } from "../types";

interface GameContainerProps {
  width: number;
  height: number;
  playerX: number;
  enemies: Enemy[];
  plates: Plate[];
  score: number;
  timeLeft: number;
  totalCalories: number;
  onMovePlayer: (direction: number) => void;
  onStopPlayer: () => void;
  onShootPlate: () => void;
  setVolume: (volume: number) => void;
}

const GameContainer: React.FC<GameContainerProps> = ({
  width,
  height,
  playerX,
  enemies,
  plates,
  score,
  timeLeft,
  totalCalories,
  onMovePlayer,
  onStopPlayer,
  onShootPlate,
  setVolume,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        onMovePlayer(-1);
      } else if (e.key === "ArrowRight") {
        onMovePlayer(1);
      } else if (e.key === " ") {
        onShootPlate();
      }
    },
    [onMovePlayer, onShootPlate]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        onStopPlayer();
      }
    },
    [onStopPlayer]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div className="game-container" data-testid="game-container">
      <GameArea
        width={width}
        height={height * 0.8}
        playerX={playerX}
        enemies={enemies}
        plates={plates}
      />
      <div className="game-controls">
        <GameInfo
          score={score}
          timeLeft={Math.ceil(timeLeft)}
          totalCalories={totalCalories}
        />
        <ControlButtons
          onMoveLeft={() => onMovePlayer(-1)}
          onMoveRight={() => onMovePlayer(1)}
          onStopMove={onStopPlayer}
          onShootPlate={onShootPlate}
          setVolume={setVolume}
        />
      </div>
    </div>
  );
};

export default GameContainer;
