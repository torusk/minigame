import React from "react";
import { PLATE_SIZE } from "../constants";

interface PlateProps {
  x: number;
  y: number;
}

const Plate: React.FC<PlateProps> = ({ x, y }) => {
  return (
    <div
      className="plate"
      style={{
        left: x,
        top: y,
        width: PLATE_SIZE,
        height: PLATE_SIZE,
        position: "absolute",
        fontSize: "40px",
      }}
    >
      🍽️
    </div>
  );
};

export default Plate;
