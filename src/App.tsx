import React, { useState, useEffect } from "react";
import GameContainer from "./components/GameContainer";
import GameOver from "./components/GameOver";
import useGameLoop from "./hooks/useGameLoop";
import useAudio from "./hooks/useAudio";
import { GAME_WIDTH, GAME_HEIGHT } from "./constants";
import "./App.css";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const {
    isLoaded,
    playBgm,
    stopBgm,
    playGameOver,
    playPlateShoot,
    playCollision,
    setVolume,
  } = useAudio();

  const {
    playerX,
    enemies,
    plates,
    timeLeft,
    totalCalories,
    movePlayer,
    stopPlayer,
    shootPlate,
  } = useGameLoop(setGameOver, setScore, playPlateShoot, playCollision);

  useEffect(() => {
    if (isLoaded) {
      playBgm();
    }
    return () => {
      stopBgm();
    };
  }, [isLoaded, playBgm, stopBgm]);

  useEffect(() => {
    if (gameOver) {
      stopBgm();
      playGameOver();
    }
  }, [gameOver, stopBgm, playGameOver]);

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
      onStopPlayer={stopPlayer}
      onShootPlate={shootPlate}
      setVolume={setVolume}
    />
  );
}

export default App;
