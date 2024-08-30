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
    `🍽️${score}品、計${totalCalories}kal🍽️`,
    `🔥${Math.round(totalCalories / 2000)}日分のエネルギー🔥`,
    "これを消費するには",
    `${removeOccurrences(exerciseEquivalent)}をすればOK🏃‍♂️`,
  ];

  useEffect(() => {
    if (currentLine < 2) {
      const timer = setTimeout(() => {
        playGameOver();
        setCurrentLine((prev) => prev + 1);
      }, 400);
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
      }, 500);
      return () => clearInterval(dotTimer);
    } else if (currentLine === 3) {
      playFinish();
      const buttonTimer = setTimeout(() => {
        setShowButton(true);
      }, 1000);
      return () => clearTimeout(buttonTimer);
    }
  }, [currentLine, playGameOver, playFinish]);

  const shareOnTwitter = () => {
    const text = `スイーツミニゲームで${score}品GET！計${totalCalories}カロリー消費には${removeOccurrences(
      exerciseEquivalent
    )}が必要！`;
    const url = "sweets-minigame.web.app";
    const hashtags = "スイーツミニゲーム,カロリー消費";

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(hashtags)}`;

    window.open(twitterUrl, "_blank");
  };

  return (
    <div className="game-over">
      {lines.map((line, index) => (
        <p
          key={index}
          className={`line-${index} ${index <= currentLine ? "visible" : ""} ${
            index === 0 ? "blue-underline" : index === 1 ? "red-underline" : ""
          }`}
        >
          {index === 2 ? `${line}${"・".repeat(dots)}` : line}
        </p>
      ))}
      {showButton && (
        <div className="game-over-buttons">
          <button onClick={onRestart} className="visible restart-button">
            もういちどあそぶ
          </button>
          <button onClick={shareOnTwitter} className="visible share-button">
            X(Twitter)で共有
          </button>
        </div>
      )}
    </div>
  );
};

export default GameOver;
