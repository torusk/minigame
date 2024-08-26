import { useState, useEffect, useCallback, useRef } from "react";
import {
  GAME_WIDTH,
  PLAYER_WIDTH,
  GAME_HEIGHT,
  PLAYER_HEIGHT,
  ENEMY_SIZE,
  PLATE_SIZE,
  CANDY_TYPES,
} from "../constants";

function useGameLoop(setGameOver, setScore) {
  const playerXRef = useRef(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [playerX, setPlayerX] = useState(playerXRef.current);
  const playerVelocityRef = useRef(0);
  const [enemies, setEnemies] = useState([]);
  const [plates, setPlates] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalCalories, setTotalCalories] = useState(0);

  const movePlayer = useCallback((direction) => {
    playerVelocityRef.current = direction * 5;
  }, []);

  const stopPlayer = useCallback(() => {
    playerVelocityRef.current = 0;
  }, []);

  const shootPlate = useCallback(() => {
    setPlates((prevPlates) => [
      ...prevPlates,
      {
        x: playerXRef.current + PLAYER_WIDTH / 2 - PLATE_SIZE / 2,
        y: GAME_HEIGHT - PLAYER_HEIGHT - PLATE_SIZE,
      },
    ]);
  }, []);

  const updatePlayerPosition = useCallback(() => {
    const newX = Math.max(
      0,
      Math.min(
        GAME_WIDTH - PLAYER_WIDTH,
        playerXRef.current + playerVelocityRef.current
      )
    );
    playerXRef.current = newX;
    setPlayerX(newX);
  }, []);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      updatePlayerPosition();

      setEnemies((prevEnemies) =>
        prevEnemies.filter((enemy) => {
          enemy.y += 2;
          return enemy.y < GAME_HEIGHT;
        })
      );

      setPlates((prevPlates) =>
        prevPlates.filter((plate) => {
          plate.y -= 5;
          return plate.y > -PLATE_SIZE;
        })
      );

      setEnemies((prevEnemies) =>
        prevEnemies.filter((enemy) => {
          const collisionWithPlate = plates.some(
            (plate) =>
              plate.x < enemy.x + ENEMY_SIZE &&
              plate.x + PLATE_SIZE > enemy.x &&
              plate.y < enemy.y + ENEMY_SIZE &&
              plate.y + PLATE_SIZE > enemy.y
          );

          const collisionWithPlayer =
            enemy.x < playerXRef.current + PLAYER_WIDTH &&
            enemy.x + ENEMY_SIZE > playerXRef.current &&
            enemy.y + ENEMY_SIZE > GAME_HEIGHT - PLAYER_HEIGHT;

          if (collisionWithPlate || collisionWithPlayer) {
            setScore((prevScore) => prevScore + 1);
            setTotalCalories(
              (prevCalories) => prevCalories + CANDY_TYPES[enemy.type].calories
            );
            return false;
          }
          return true;
        })
      );

      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(gameLoop);
          setGameOver(true);
          return 0;
        }
        return prevTime - 0.02;
      });
    }, 16); // 約60FPSに調整

    return () => clearInterval(gameLoop);
  }, [updatePlayerPosition, plates, setGameOver, setScore]);

  useEffect(() => {
    const spawnEnemy = () => {
      setEnemies((prevEnemies) => [
        ...prevEnemies,
        {
          x: Math.random() * (GAME_WIDTH - ENEMY_SIZE),
          y: 0,
          type: Math.floor(Math.random() * CANDY_TYPES.length),
        },
      ]);
    };

    const enemySpawner = setInterval(spawnEnemy, 1000);
    return () => clearInterval(enemySpawner);
  }, []);

  return {
    playerX,
    enemies,
    plates,
    timeLeft,
    totalCalories,
    movePlayer,
    stopPlayer,
    shootPlate,
  };
}

export default useGameLoop;
