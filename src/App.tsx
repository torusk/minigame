import { useState, useEffect, useCallback } from "react";
import GameContainer from "./components/GameContainer";
import GameOver from "./components/GameOver";
import useGameLoop from "./hooks/useGameLoop";
import useAudio from "./hooks/useAudio";
import "./App.css";

function App() {
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [gameSize, setGameSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
    gamePhase, // 追加
  } = useGameLoop(
    setGameOver,
    setScore,
    playPlateShoot,
    playCollision,
    gameSize
  );

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

  const handleResize = useCallback(() => {
    setGameSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

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
      width={gameSize.width}
      height={gameSize.height}
      playerX={playerX}
      enemies={enemies}
      plates={plates}
      score={score}
      timeLeft={timeLeft}
      totalCalories={totalCalories}
      gamePhase={gamePhase} // 追加
      onMovePlayer={movePlayer}
      onStopPlayer={stopPlayer}
      onShootPlate={shootPlate}
      setVolume={setVolume}
    />
  );
}

export default App;
