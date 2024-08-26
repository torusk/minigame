import React from 'react';
import { POWERUP_SIZE } from '../constants';

function PowerUp({ x, y }) {
  return (
    <div
      className="power-up"
      style={{
        left: x,
        top: y,
        width: POWERUP_SIZE,
        height: POWERUP_SIZE,
      }}
    />
  );
}

export default PowerUp;
