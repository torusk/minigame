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
    </div>
  );
};

export default ControlButtons;
