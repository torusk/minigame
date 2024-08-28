import React, { useEffect, useCallback } from "react";
import GameArea from "./GameArea";
import GameInfo from "./GameInfo";
import ControlButtons from "./ControlButtons";

interface GameContainerProps {
  width: number;
  height: number;
  playerX: number;
  enemies: Array<any>; // TODO: Define proper type for enemies
  plates: Array<any>; // TODO: Define proper type for plates
  score: number;
  timeLeft: number;
  onMovePlayer: (direction: number) => void;
  onStopPlayer: () => void;
  onShootPlate: () => void;
}

const GameContainer: React.FC<GameContainerProps> = ({
  width,
  height,
  playerX,
  enemies,
  plates,
  score,
  timeLeft,
  onMovePlayer,
  onStopPlayer,
  onShootPlate,
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
        height={height}
        playerX={playerX}
        enemies={enemies}
        plates={plates}
      />
      <GameInfo score={score} timeLeft={Math.ceil(timeLeft)} />
      <ControlButtons
        onMoveLeft={() => onMovePlayer(-1)}
        onMoveRight={() => onMovePlayer(1)}
        onStopMove={onStopPlayer}
        onShootPlate={onShootPlate}
      />
    </div>
  );
};

export default GameContainer;
