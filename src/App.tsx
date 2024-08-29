import { useState, useEffect, useCallback } from "react";
import GameContainer from "./components/GameContainer";
import GameOver from "./components/GameOver";
import useGameLoop from "./hooks/useGameLoop";
import useAudio from "./hooks/useAudio";
import "./App.css";

function App() {
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
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
  } = useGameLoop(
    setGameOver,
    setScore,
    playPlateShoot,
    playCollision,
    gameSize
  );

  useEffect(() => {
    if (isLoaded && !isMuted) {
      playBgm();
    }
    return () => {
      stopBgm();
    };
  }, [isLoaded, isMuted, playBgm, stopBgm]);

  useEffect(() => {
    if (gameOver && !isMuted) {
      stopBgm();
      playGameOver();
    }
  }, [gameOver, isMuted, stopBgm, playGameOver]);

  const handleResize = useCallback(() => {
    setGameSize({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    setVolume(isMuted ? 1 : 0);
  }, [isMuted, setVolume]);

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
      timeLeft={timeLeft}
      onMovePlayer={movePlayer}
      onStopPlayer={stopPlayer}
      onShootPlate={shootPlate}
      toggleMute={toggleMute}
      isMuted={isMuted}
    />
  );
}

export default App;
