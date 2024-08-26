import React, { useEffect, useCallback } from "react";
import GameArea from "./GameArea";
import GameInfo from "./GameInfo";
import ControlButtons from "./ControlButtons";

function GameContainer({
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
}) {
  const handleKeyDown = useCallback(
    (e) => {
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
    (e) => {
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
}

export default GameContainer;
