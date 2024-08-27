import React from "react";

function GameInfo({ score, timeLeft, totalCalories }) {
  return (
    <div className="game-info">
      <p>{score}皿たべたよ</p>
      <p>残り時間は: {Math.ceil(timeLeft)}秒</p>
    </div>
  );
}

export default GameInfo;
