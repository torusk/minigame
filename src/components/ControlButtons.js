import React from "react";

function ControlButtons({ onMoveLeft, onMoveRight }) {
  return (
    <div className="control-buttons">
      <button
        className="control-button left"
        onTouchStart={onMoveLeft}
        onMouseDown={onMoveLeft}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseUp={(e) => e.preventDefault()}
      >
        ←
      </button>
      <button
        className="control-button right"
        onTouchStart={onMoveRight}
        onMouseDown={onMoveRight}
        onTouchEnd={(e) => e.preventDefault()}
        onMouseUp={(e) => e.preventDefault()}
      >
        →
      </button>
    </div>
  );
}

export default ControlButtons;
