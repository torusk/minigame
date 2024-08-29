import React, { useEffect, useCallback } from "react";
import GameArea from "./GameArea";
import ControlButtons from "./ControlButtons";
import { Enemy, Plate } from "../types";

interface GameContainerProps {
  width: number;
  height: number;
  playerX: number;
  enemies: Enemy[];
  plates: Plate[];
  timeLeft: number;
  onMovePlayer: (direction: number) => void;
  onStopPlayer: () => void;
  onShootPlate: () => void;
  toggleMute: () => void;
  isMuted: boolean;
}

const GameContainer: React.FC<GameContainerProps> = ({
  width,
  height,
  playerX,
  enemies,
  plates,
  timeLeft,
  onMovePlayer,
  onStopPlayer,
  onShootPlate,
  toggleMute,
  isMuted,
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

  const gameAreaHeight = height - 100;

  return (
    <div className="game-container" data-testid="game-container">
      <GameArea
        width={width}
        height={gameAreaHeight}
        playerX={playerX}
        enemies={enemies}
        plates={plates}
      />
      <div className="game-controls">
        <ControlButtons
          onMoveLeft={() => onMovePlayer(-1)}
          onMoveRight={() => onMovePlayer(1)}
          onStopMove={onStopPlayer}
          onShootPlate={onShootPlate}
          toggleMute={toggleMute}
          isMuted={isMuted}
          timeLeft={timeLeft}
        />
      </div>
    </div>
  );
};

export default GameContainer;
