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
  // 新しい状態変数を追加してゲームのリセットを制御
  const [gameKey, setGameKey] = useState<number>(0);

  const {
    isLoaded,
    playBgm,
    stopBgm,
    playGameOver,
    playPlateShoot,
    playCollision,
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
    resetGame, // useGameLoopから新しい関数をインポート
  } = useGameLoop(
    setGameOver,
    setScore,
    playPlateShoot,
    playCollision,
    gameSize,
    gameKey // gameKeyを引数として渡す
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
    resetGame(); // ゲームループ内の状態をリセット
    setGameKey((prevKey) => prevKey + 1); // gameKeyを更新してコンポーネントを強制的に再マウント
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
      />
    );
  }

  return (
    <GameContainer
      key={gameKey} // keyプロパティを追加してコンポーネントを強制的に再マウント
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
    />
  );
}

export default App;
