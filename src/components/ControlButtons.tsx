import React from "react";

interface ControlButtonsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onStopMove: () => void;
  onShootPlate: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onMoveLeft,
  onMoveRight,
  onStopMove,
  onShootPlate,
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
        ◀️
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
        ▶️
      </button>
    </div>
  );
};

export default ControlButtons;
