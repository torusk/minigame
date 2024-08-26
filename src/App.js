import React, { useState } from "react";
import GameContainer from "./components/GameContainer";
import GameOver from "./components/GameOver";
import useGameLoop from "./hooks/useGameLoop";
import { GAME_WIDTH, GAME_HEIGHT } from "./constants";
import "./App.css";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const {
    playerX,
    enemies,
    plates,
    timeLeft,
    totalCalories,
    movePlayer,
    shootPlate,
  } = useGameLoop(setGameOver, setScore);

  if (gameOver) {
    return (
      <GameOver
        score={score}
        totalCalories={totalCalories}
        onRestart={() => window.location.reload()}
      />
    );
  }

  return (
    <GameContainer
      width={GAME_WIDTH}
      height={GAME_HEIGHT}
      playerX={playerX}
      enemies={enemies}
      plates={plates}
      score={score}
      timeLeft={timeLeft}
      totalCalories={totalCalories}
      onMovePlayer={movePlayer}
      onShootPlate={shootPlate}
    />
  );
}

export default App;
