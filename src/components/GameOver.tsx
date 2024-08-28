import React from "react";
import { calculateExercise } from "../utils/calorieUtils";

interface GameOverProps {
  score: number;
  totalCalories: number;
  onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({
  score,
  totalCalories,
  onRestart,
}) => {
  const exerciseEquivalent = calculateExercise(totalCalories);

  // 運動の文字列から回数の表現を削除する関数
  const removeOccurrences = (exercise: string): string => {
    return exercise.replace(/\d+回の/, "");
  };

  return (
    <div className="game-over">
      <h1>🍰おしまい🍩</h1>
      <p>おなかいっぱいだね！全部で{score}皿も食べたよ！</p>
      <p>
        <span className="emphasized-exercise">{totalCalories}</span>
        カロリー分のエネルギー量だよ。 <p>これを消費するには・・・</p>
      </p>
      <p>
        <span className="emphasized-exercise">
          {removeOccurrences(exerciseEquivalent)}
        </span>
        をすればOKだよ。がんばって！
      </p>
      <button onClick={onRestart}>もう一度あそぶ</button>
    </div>
  );
};

export default GameOver;
