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
  const [gameKey, setGameKey] = useState<number>(0);

  const {
    isLoaded,
    playBgm,
    stopBgm,
    playGameOver,
    playPlateShoot,
    playCollision,
    playFinish,
    toggleMute,
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
    resetGame,
    gamePhase, // Add this line to get gamePhase from useGameLoop
  } = useGameLoop(
    setGameOver,
    setScore,
    playPlateShoot,
    playCollision,
    gameSize,
    gameKey
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

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    toggleMute();
  }, [toggleMute]);

  const handleRestart = useCallback(() => {
    setGameOver(false);
    setScore(0);
    resetGame();
    setGameKey((prevKey) => prevKey + 1);
    if (!isMuted) {
      playBgm();
    }
  }, [isMuted, playBgm, resetGame]);

  if (gameOver) {
    return (
      <GameOver
        score={score}
        totalCalories={totalCalories}
        onRestart={handleRestart}
        playGameOver={playGameOver}
        playFinish={playFinish}
      />
    );
  }

  return (
    <GameContainer
      key={gameKey}
      width={gameSize.width}
      height={gameSize.height}
      playerX={playerX}
      enemies={enemies}
      plates={plates}
      timeLeft={timeLeft}
      onMovePlayer={movePlayer}
      onStopPlayer={stopPlayer}
      onShootPlate={shootPlate}
      toggleMute={handleToggleMute}
      isMuted={isMuted}
      gamePhase={gamePhase} // Add this line to pass gamePhase to GameContainer
    />
  );
}

export default App;
