import React, { useState, useEffect } from "react";
import { calculateExercise } from "../utils/calorieUtils";

interface GameOverProps {
  score: number;
  totalCalories: number;
  onRestart: () => void;
  playGameOver: () => void;
  playFinish: () => void;
}

const GameOver: React.FC<GameOverProps> = ({
  score,
  totalCalories,
  onRestart,
  playGameOver,
  playFinish,
}) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [dots, setDots] = useState(0);

  const exerciseEquivalent = calculateExercise(totalCalories);

  const removeOccurrences = (exercise: string): string => {
    return exercise.replace(/\d+回の/, "");
  };

  const lines = [
    `🍽️${score}品GET🍽️`,
    `🔥計${totalCalories}カロリー🔥`,
    "これを消費するには",
    `🏃‍♀️${removeOccurrences(exerciseEquivalent)}をすればOK🏃‍♂️`,
  ];

  useEffect(() => {
    if (currentLine < 2) {
      const timer = setTimeout(() => {
        playGameOver();
        setCurrentLine((prev) => prev + 1);
      }, 450);
      return () => clearTimeout(timer);
    } else if (currentLine === 2) {
      const dotTimer = setInterval(() => {
        setDots((prevDots) => {
          if (prevDots < 3) {
            return prevDots + 1;
          } else {
            clearInterval(dotTimer);
            setCurrentLine((prev) => prev + 1);
            return prevDots;
          }
        });
      }, 500); // ドットの表示間隔を500ミリ秒に変更
      return () => clearInterval(dotTimer);
    } else if (currentLine === 3) {
      playFinish(); // 最後の行を表示する際に新しい音源を再生
      const buttonTimer = setTimeout(() => {
        setShowButton(true);
      }, 2000);
      return () => clearTimeout(buttonTimer);
    }
  }, [currentLine, playGameOver, playFinish]);

  return (
    <div className="game-over">
      {lines.map((line, index) => (
        <p
          key={index}
          className={`line-${index} ${index <= currentLine ? "visible" : ""}`}
        >
          {index === 2 ? `${line}${"・".repeat(dots)}` : line}
        </p>
      ))}
      {showButton && (
        <button onClick={onRestart} className="visible restart-button">
          もう一度あそぶ
        </button>
      )}
    </div>
  );
};

export default GameOver;
