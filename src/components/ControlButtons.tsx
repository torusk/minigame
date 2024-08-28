import React from "react";

interface ControlButtonsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onStopMove: () => void;
  onShootPlate: () => void;
  setVolume: (volume: number) => void; // この行を追加
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onMoveLeft,
  onMoveRight,
  onStopMove,
  onShootPlate,
  setVolume, // この行を追加
}) => {
  return (
    <div className="control-buttons">
      <button
        className="control-button left"
        onTouchStart={onMoveLeft}
        onMouseDown={onMoveLeft}
        onTouchEnd={onStopMove}
        onMouseUp={onStopMove}
        onMouseLeave={onStopMove}
      >
        ←
      </button>
      <button
        className="control-button shoot"
        onTouchStart={onShootPlate}
        onMouseDown={onShootPlate}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseUp={(e) => e.preventDefault()}
      >
        🍽️
      </button>
      <button
        className="control-button right"
        onTouchStart={onMoveRight}
        onMouseDown={onMoveRight}
        onTouchEnd={onStopMove}
        onMouseUp={onStopMove}
        onMouseLeave={onStopMove}
      >
        →
      </button>
      {/* ボリューム調整用のスライダーを追加 */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default ControlButtons;
