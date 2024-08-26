import React from "react";

function GameInfo({ score, timeLeft }) {
  return (
    <div className="game-info">
      <p>お菓子を{score}こ食べたよ</p>
      <p> のこり{timeLeft}秒</p>
    </div>
  );
}

export default GameInfo;
