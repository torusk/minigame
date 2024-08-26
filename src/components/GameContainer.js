import React from "react";
import GameArea from "./GameArea";
import GameInfo from "./GameInfo";
import ControlButtons from "./ControlButtons";

function GameContainer({
  width,
  height,
  playerX,
  enemies,
  score,
  timeLeft,
  onMovePlayer,
}) {
  return (
    <div className="game-container">
      <GameArea
        width={width}
        height={height}
        playerX={playerX}
        enemies={enemies}
      />
      <GameInfo score={score} timeLeft={Math.ceil(timeLeft)} />
      <ControlButtons
        onMoveLeft={() => onMovePlayer(-1)}
        onMoveRight={() => onMovePlayer(1)}
      />
    </div>
  );
}

export default GameContainer;
