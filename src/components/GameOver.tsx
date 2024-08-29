import React, { useState, useEffect } from "react";
import { calculateExercise } from "../utils/calorieUtils";

// GameOverコンポーネントのプロップスの型定義
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
  // 現在表示中の行番号を管理するステート
  const [currentLine, setCurrentLine] = useState(0);
  // リスタートボタンの表示状態を管理するステート
  const [showButton, setShowButton] = useState(false);

  // 消費カロリーに相当する運動量を計算
  const exerciseEquivalent = calculateExercise(totalCalories);

  // 運動量の表現から回数を削除する関数
  const removeOccurrences = (exercise: string): string => {
    return exercise.replace(/\d+回の/, "");
  };

  // 表示するテキストの配列
  const lines = [
    `全部で${score}皿食べたよ！`,
    `${totalCalories}カロリー分のエネルギー量だよ！`,
    "これを消費するには・・・",
    `${removeOccurrences(exerciseEquivalent)}をすればOKだよ。がんばって！`,
  ];

  // テキストのアニメーション表示と効果音の再生を制御するeffect
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
