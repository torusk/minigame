import React from 'react';
import { PLATE_SIZE } from '../constants';

function Plate({ x, y }) {
  return (
    <div
      className="plate"
      style={{
        left: x,
        top: y,
        width: PLATE_SIZE,
        height: PLATE_SIZE,
        position: 'absolute',
        fontSize: '24px',
      }}
    >
      🍽️
    </div>
  );
}

export default Plate;
