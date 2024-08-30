import React from "react";
import Player from "./Player";
import Enemy from "./Enemy";
import Plate from "./Plate";
import { Enemy as EnemyType, Plate as PlateType } from "../types";
import { PLAYER_WIDTH } from "../constants";

// GameAreaProps: このコンポーネントのプロパティを定義
interface GameAreaProps {
  playerX: number; // プレイヤーのX座標
  enemies: EnemyType[]; // 敵の配列
  plates: PlateType[]; // 皿の配列
}

const GameArea: React.FC<GameAreaProps> = ({ playerX, enemies, plates }) => {
  // ゲームエリアへの参照 - サイズ計算に使用
  const gameAreaRef = React.useRef<HTMLDivElement>(null);

  // プレイヤーのX座標をゲームエリア内に制限する関数
  // 注: この関数は画面サイズが変更された場合にも正しく動作するはずですが、
  // レスポンシブデザインを実装する際は、ここの計算ロジックを確認してください
  const clampPlayerX = (x: number): number => {
    if (!gameAreaRef.current) return x;
    const gameAreaWidth = gameAreaRef.current.clientWidth;
    return Math.max(0, Math.min(x, gameAreaWidth - PLAYER_WIDTH));
  };

  return (
    // ゲームエリア
    // 注: クラス名 "game-area" のスタイルを調整することで、ゲームエリアのサイズや外観を変更できます
    <div className="game-area" ref={gameAreaRef}>
      {/* プレイヤー - X座標を制限して配置 */}
      <Player x={clampPlayerX(playerX)} />

      {/* 敵 - 配列内の各敵を描画 */}
      {enemies.map((enemy, index) => (
        <Enemy
          key={`enemy-${index}`}
          x={enemy.x}
          y={enemy.y}
          type={enemy.type}
        />
      ))}

      {/* 皿 - 配列内の各皿を描画 */}
      {plates.map((plate, index) => (
        <Plate key={`plate-${index}`} x={plate.x} y={plate.y} />
      ))}
    </div>
  );
};

export default GameArea;
