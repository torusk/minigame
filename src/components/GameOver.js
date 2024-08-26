import React from "react";

function GameOver({ score, onRestart }) {
  return (
    <div className="game-over">
      <h1>〜🐰おしまい🍩〜</h1>
      <p>すごい！おやつを{score}こも食べたよ！！</p>
      <button onClick={onRestart}>もう一度あそぶ</button>
    </div>
  );
}

export default GameOver;
