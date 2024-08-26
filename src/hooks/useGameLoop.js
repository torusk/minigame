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
      const newX = prevX + direction * 20;
      return Math.max(0, Math.min(GAME_WIDTH - PLAYER_WIDTH, newX));
    });
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setEnemies((prevEnemies) => {
        return prevEnemies.filter((enemy) => {
          // お菓子の落下速度を遅くする（1ピクセルに変更）
          const nextY = enemy.y + 1;

          // 衝突判定（お菓子が皿に触れたかどうか）
          const collision =
            nextY + ENEMY_SIZE > GAME_HEIGHT - PLAYER_HEIGHT &&
            enemy.x < playerX + PLAYER_WIDTH &&
            enemy.x + ENEMY_SIZE > playerX;

          if (collision) {
            setScore((prevScore) => prevScore + 1);
            return false; // お菓子を消去
          }

          // 衝突していない場合、お菓子を移動
          enemy.y = nextY;

          return enemy.y < GAME_HEIGHT; // 画面内にあるお菓子のみ残す
        });
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
          type: Math.floor(Math.random() * 6),
        },
      ]);
    };

    const enemySpawner = setInterval(spawnEnemy, 1000);
    return () => clearInterval(enemySpawner);
  }, []);

  return { playerX, enemies, timeLeft, movePlayer };
}

export default useGameLoop;
