import React from "react";
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
  onShootPlate,
}) {
  return (
    <div className="game-container">
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
        onShootPlate={onShootPlate}
      />
    </div>
  );
}

export default GameContainer;
