import React, { useState, useEffect } from "react";
import { calculateExercise } from "../utils/calorieUtils";

interface GameOverProps {
  score: number;
  totalCalories: number;
  onRestart: () => void;
  playGameOver: () => void;
}

const GameOver: React.FC<GameOverProps> = ({
  score,
  totalCalories,
  onRestart,
  playGameOver,
}) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const exerciseEquivalent = calculateExercise(totalCalories);

  const removeOccurrences = (exercise: string): string => {
    return exercise.replace(/\d+回の/, "");
  };

  const lines = [
    `全部で${score}皿食べたよ！`,
    `${totalCalories}カロリー分のエネルギー量だよ！`,
    "これを消費するには・・・",
    `${removeOccurrences(exerciseEquivalent)}をすればOKだよ。がんばって！`,
  ];

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        playGameOver();
        setCurrentLine((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentLine === lines.length) {
      const buttonTimer = setTimeout(() => {
        setShowButton(true);
      }, 1000);
      return () => clearTimeout(buttonTimer);
    }
  }, [currentLine, lines.length, playGameOver]);

  return (
    <div className="game-over">
      {lines.map((line, index) => (
        <p
          key={index}
          className={`line-${index} ${index < currentLine ? "visible" : ""}`}
        >
          {line}
        </p>
      ))}
      {showButton && (
        <button onClick={onRestart} className="visible">
          もう一度あそぶ
        </button>
      )}
    </div>
  );
};

export default GameOver;
