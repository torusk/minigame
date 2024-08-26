import { useState, useEffect, useCallback } from "react";
import {
  GAME_WIDTH,
  PLAYER_WIDTH,
  GAME_HEIGHT,
  PLAYER_HEIGHT,
  ENEMY_SIZE,
  PLATE_SIZE,
} from "../constants";

function useGameLoop(setGameOver, setScore) {
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [enemies, setEnemies] = useState([]);
  const [plates, setPlates] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  const movePlayer = useCallback((direction) => {
    setPlayerX((prevX) => {
      const newX = prevX + direction * 20;
      return Math.max(0, Math.min(GAME_WIDTH - PLAYER_WIDTH, newX));
    });
  }, []);

  const shootPlate = useCallback(() => {
    setPlates((prevPlates) => [
      ...prevPlates,
      {
        x: playerX + PLAYER_WIDTH / 2 - PLATE_SIZE / 2,
        y: GAME_HEIGHT - PLAYER_HEIGHT - PLATE_SIZE,
      },
    ]);
  }, [playerX]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setEnemies((prevEnemies) => {
        return prevEnemies.filter((enemy) => {
          enemy.y += 2;
          return enemy.y < GAME_HEIGHT;
        });
      });

      setPlates((prevPlates) => {
        return prevPlates.filter((plate) => {
          plate.y -= 5;
          return plate.y > -PLATE_SIZE;
        });
      });

      // 衝突判定
      setEnemies((prevEnemies) => {
        return prevEnemies.filter((enemy) => {
          const collisionWithPlate = plates.some(
            (plate) =>
              plate.x < enemy.x + ENEMY_SIZE &&
              plate.x + PLATE_SIZE > enemy.x &&
              plate.y < enemy.y + ENEMY_SIZE &&
              plate.y + PLATE_SIZE > enemy.y
          );

          if (collisionWithPlate) {
            setScore((prevScore) => prevScore + 1);
            return false;
          }
          return true;
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
  }, [plates, setGameOver, setScore]);

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

  return { playerX, enemies, plates, timeLeft, movePlayer, shootPlate };
}

export default useGameLoop;
