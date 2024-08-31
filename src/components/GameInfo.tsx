import React from "react";

interface GameInfoProps {
  score: number;
  timeLeft: number;
  totalCalories: number;
  gamePhase: "normal" | "intense"; // 追加
}

const GameInfo: React.FC<GameInfoProps> = ({
  score,
  timeLeft,
  totalCalories,
  gamePhase, // 追加
}) => {
  return (
    <div className={`game-info ${gamePhase === "intense" ? "intense" : ""}`}>
      <p>{score}皿たべたよ</p>
      <p>残り時間は: {Math.ceil(timeLeft)}秒</p>
      <p>合計カロリー: {totalCalories}kcal</p>
      {gamePhase === "intense" && (
        <p className="intense-warning">インテンスモード！</p>
      )}
    </div>
  );
};

export default GameInfo;
