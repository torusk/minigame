import React from "react";

interface ControlButtonsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onStopMove: () => void;
  onShootPlate: () => void;
  toggleMute: () => void;
  isMuted: boolean;
  timeLeft: number;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onMoveLeft,
  onMoveRight,
  onStopMove,
  onShootPlate,
  toggleMute,
  isMuted,
  timeLeft,
}) => {
  return (
    <div className="control-buttons">
      <button
        onTouchStart={onMoveLeft}
        onMouseDown={onMoveLeft}
        onTouchEnd={onStopMove}
        onMouseUp={onStopMove}
        onMouseLeave={onStopMove}
      >
        ←
      </button>
      <button onTouchStart={onShootPlate} onMouseDown={onShootPlate}>
        🍽️
      </button>
      <button
        onTouchStart={onMoveRight}
        onMouseDown={onMoveRight}
        onTouchEnd={onStopMove}
        onMouseUp={onStopMove}
        onMouseLeave={onStopMove}
      >
        →
      </button>
      <button onClick={toggleMute}>{isMuted ? "🔇" : "🔊"}</button>
      <span>残り時間: {Math.ceil(timeLeft)}秒</span>
    </div>
  );
};

export default ControlButtons;
