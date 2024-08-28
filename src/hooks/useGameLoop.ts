import { useState, useEffect, useCallback, useRef } from "react";
import {
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  ENEMY_SIZE,
  PLATE_SIZE,
  CANDY_TYPES,
} from "../constants";
import { Enemy, Plate } from "../types";

// ゲームの設定（後から調整可能）
const GAME_DURATION = 30; // ゲームの総時間（秒）
const INTENSE_PHASE_DURATION = 10; // インテンスフェーズの時間（秒）
const INTENSE_SPAWN_MULTIPLIER = 5; // インテンスフェーズでのスポーン倍率
// const NORMAL_SPAWN_INTERVAL = 1000; // 通常フェーズでのスポーン間隔（ミリ秒）
// const INTENSE_SPAWN_INTERVAL = 200; // インテンスフェーズでのスポーン間隔（ミリ秒）

function useGameLoop(
  setGameOver: (isOver: boolean) => void,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  playPlateShoot: () => void,
  playCollision: () => void,
  gameSize: { width: number; height: number }
) {
  const playerXRef = useRef<number>(gameSize.width / 2 - PLAYER_WIDTH / 2);
  const [playerX, setPlayerX] = useState<number>(playerXRef.current);
  const playerVelocityRef = useRef<number>(0);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [plates, setPlates] = useState<Plate[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(GAME_DURATION);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(true);
  const [gamePhase, setGamePhase] = useState<"normal" | "intense">("normal");

  const movePlayer = useCallback((direction: number) => {
    playerVelocityRef.current = direction * 5;
  }, []);

  const stopPlayer = useCallback(() => {
    playerVelocityRef.current = 0;
  }, []);

  const shootPlate = useCallback(() => {
    if (!isGameActive) return;
    playPlateShoot();
    setPlates((prevPlates) => [
      ...prevPlates,
      {
        x: playerXRef.current + PLAYER_WIDTH / 2 - PLATE_SIZE / 2,
        y: gameSize.height - PLAYER_HEIGHT - PLATE_SIZE,
      },
    ]);
  }, [isGameActive, playPlateShoot, gameSize.height]);

  const updatePlayerPosition = useCallback(() => {
    const newX = Math.max(
      0,
      Math.min(
        gameSize.width - PLAYER_WIDTH,
        playerXRef.current + playerVelocityRef.current
      )
    );
    playerXRef.current = newX;
    setPlayerX(newX);
  }, [gameSize.width]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      if (!isGameActive) return;

      updatePlayerPosition();

      setEnemies((prevEnemies) =>
        prevEnemies.filter((enemy) => {
          enemy.y += 2;
          return enemy.y < gameSize.height;
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
            enemy.y + ENEMY_SIZE > gameSize.height - PLAYER_HEIGHT;

          if (collisionWithPlate || collisionWithPlayer) {
            playCollision();
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
          setIsGameActive(false);
          setGameOver(true);
          return 0;
        }
        // ここでフェーズを切り替える
        if (prevTime <= INTENSE_PHASE_DURATION && gamePhase === "normal") {
          setGamePhase("intense");
        }
        return prevTime - 0.02;
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [
    updatePlayerPosition,
    plates,
    setGameOver,
    setScore,
    isGameActive,
    playCollision,
    gameSize.height,
    gamePhase,
  ]);

  useEffect(() => {
    const spawnEnemy = () => {
      if (!isGameActive) return;
      // フェーズに応じてスポーン数を調整
      const spawnCount = gamePhase === "intense" ? INTENSE_SPAWN_MULTIPLIER : 1;
      for (let i = 0; i < spawnCount; i++) {
        setEnemies((prevEnemies) => [
          ...prevEnemies,
          {
            x: Math.random() * (gameSize.width - ENEMY_SIZE),
            y: 0,
            type: Math.floor(Math.random() * CANDY_TYPES.length),
          },
        ]);
      }
    };

    // フェーズに応じてスポーン間隔を調整
    const spawnInterval = gamePhase === "intense" ? 200 : 1000; // ミリ秒
    const enemySpawner = setInterval(spawnEnemy, spawnInterval);
    return () => clearInterval(enemySpawner);
  }, [isGameActive, gameSize.width, gamePhase]);

  return {
    playerX,
    enemies,
    plates,
    timeLeft,
    totalCalories,
    movePlayer,
    stopPlayer,
    shootPlate,
    gamePhase,
  };
}

export default useGameLoop;