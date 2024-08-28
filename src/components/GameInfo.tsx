import React from "react";

interface GameInfoProps {
  score: number;
  timeLeft: number;
  totalCalories: number;
}

const GameInfo: React.FC<GameInfoProps> = ({
  score,
  timeLeft,
  totalCalories,
}) => {
  return (
    <div className="game-info">
      <p>{score}皿たべたよ</p>
      <p>残り時間は: {Math.ceil(timeLeft)}秒</p>
      <p>合計カロリー: {totalCalories}kcal</p>
    </div>
  );
};

export default GameInfo;
