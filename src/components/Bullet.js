import React from 'react';
import { BULLET_SIZE } from '../constants';

function Bullet({ x, y }) {
  return (
    <div
      className="bullet"
      style={{
        left: x,
        top: y,
        width: BULLET_SIZE,
        height: BULLET_SIZE,
      }}
    />
  );
}

export default Bullet;
