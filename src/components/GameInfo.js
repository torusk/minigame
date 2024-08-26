import React from "react";

function GameInfo({ score, timeLeft }) {
  return (
    <div className="game-info">
      <p>Score: {score}</p>
      <p>Time Left: {timeLeft} seconds</p>
    </div>
  );
}

export default GameInfo;
