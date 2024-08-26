import React from 'react';

function GameOver({ score, onRestart }) {
  return (
    <div className="game-over">
      <h1>Game Over</h1>
      <p>Score: {score}</p>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
}

export default GameOver;
