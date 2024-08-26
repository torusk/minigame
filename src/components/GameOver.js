import React from "react";
import { calculateExercise } from "../utils/calorieUtils";

function GameOver({ score, totalCalories, onRestart }) {
  const exerciseEquivalent = calculateExercise(totalCalories);

  return (
    <div className="game-over">
      <h1>🍰おしまい🍩</h1>
      <p>おなかいっぱいだね！おかしを全部で{score}こも食べたよ！</p>
      <p>
        全部でなんと{totalCalories}カロリー分も食べちゃったね。
        このカロリーを消費するには・・・
      </p>
      <p>{exerciseEquivalent}すればOKだよ。がんばろう！</p>
      <button onClick={onRestart}>もう一度あそぶ</button>
    </div>
  );
}

export default GameOver;
