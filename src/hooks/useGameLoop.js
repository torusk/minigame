import { useState, useEffect, useCallback } from "react";
import {
  GAME_WIDTH,
  PLAYER_WIDTH,
  GAME_HEIGHT,
  PLAYER_HEIGHT,
  ENEMY_SIZE,
} from "../constants";

function useGameLoop(setGameOver, setScore) {
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [enemies, setEnemies] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  const movePlayer = useCallback((direction) => {
    setPlayerX((prevX) => {
      const newX = prevX + direction * 10;
      return Math.max(0, Math.min(GAME_WIDTH - PLAYER_WIDTH, newX));
    });
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setEnemies((prevEnemies) => {
        const newEnemies = prevEnemies
          .map((enemy) => ({ ...enemy, y: enemy.y + 2 }))
          .filter((enemy) => enemy.y < GAME_HEIGHT);

        // プレイヤーとの衝突をチェック
        newEnemies.forEach((enemy) => {
          if (
            enemy.y + ENEMY_SIZE > GAME_HEIGHT - PLAYER_HEIGHT &&
            enemy.x < playerX + PLAYER_WIDTH &&
            enemy.x + ENEMY_SIZE > playerX
          ) {
            setScore((prevScore) => prevScore + 1);
            enemy.collected = true;
          }
        });

        return newEnemies.filter((enemy) => !enemy.collected);
      });

      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(gameLoop);
          setGameOver(true);
          return 0;
        }
        return prevTime - 0.02;
      });
    }, 20);

    return () => clearInterval(gameLoop);
  }, [playerX, setGameOver, setScore]);

  useEffect(() => {
    const spawnEnemy = () => {
      setEnemies((prevEnemies) => [
        ...prevEnemies,
        {
          x: Math.random() * (GAME_WIDTH - ENEMY_SIZE),
          y: 0,
          type: Math.floor(Math.random() * 6), // 0-5のランダムな整数
        },
      ]);
    };

    const enemySpawner = setInterval(spawnEnemy, 1000);
    return () => clearInterval(enemySpawner);
  }, []);

  return {
    playerX,
    enemies,
    timeLeft,
    movePlayer,
  };
}

export default useGameLoop;
