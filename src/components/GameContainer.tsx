import React, { useEffect, useCallback, useRef } from "react";
import GameArea from "./GameArea";
import ControlButtons from "./ControlButtons";
import { Enemy, Plate } from "../types";
import { PLAYER_WIDTH } from "../constants";

interface GameContainerProps {
  playerX: number;
  enemies: Enemy[];
  plates: Plate[];
  timeLeft: number;
  onMovePlayer: (direction: number) => void;
  onStopPlayer: () => void;
  onShootPlate: () => void;
  toggleMute: () => void;
  isMuted: boolean;
}

const GameContainer: React.FC<GameContainerProps> = ({
  playerX,
  enemies,
  plates,
  timeLeft,
  onMovePlayer,
  onStopPlayer,
  onShootPlate,
  toggleMute,
  isMuted,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const clampPlayerX = useCallback((x: number): number => {
    if (!containerRef.current) return x;
    const containerWidth = containerRef.current.clientWidth;
    return Math.max(0, Math.min(x, containerWidth - PLAYER_WIDTH));
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        onMovePlayer(-1);
      } else if (e.key === "ArrowRight") {
        onMovePlayer(1);
      } else if (e.key === " ") {
        onShootPlate();
      }
    },
    [onMovePlayer, onShootPlate]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        onStopPlayer();
      }
    },
    [onStopPlayer]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div
      className="game-container"
      data-testid="game-container"
      ref={containerRef}
    >
      <GameArea
        playerX={clampPlayerX(playerX)}
        enemies={enemies}
        plates={plates}
      />
      <div className="game-controls">
        <ControlButtons
          onMoveLeft={() => onMovePlayer(-1)}
          onMoveRight={() => onMovePlayer(1)}
          onStopMove={onStopPlayer}
          onShootPlate={onShootPlate}
          toggleMute={toggleMute}
          isMuted={isMuted}
          timeLeft={timeLeft}
        />
      </div>
    </div>
  );
};

export default GameContainer;
