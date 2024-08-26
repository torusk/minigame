import React from "react";

function GameInfo({ score, timeLeft, totalCalories }) {
  return (
    <div className="game-info">
      <p>おかしを{score}こ食べてるよ</p>
      <p>残り時間は: {Math.ceil(timeLeft)}秒</p>
    </div>
  );
}

export default GameInfo;
