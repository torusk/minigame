import { ENEMY_SIZE, BULLET_SIZE, POWERUP_SIZE, PLAYER_WIDTH, PLAYER_HEIGHT, GAME_HEIGHT } from '../constants';

export function checkCollisions(bullets, enemies, powerUps, playerX, setScore, setDoubleBullets) {
  // Check bullet-enemy collisions
  bullets.forEach((bullet) => {
    enemies.forEach((enemy, index) => {
      if (
        bullet.x < enemy.x + ENEMY_SIZE &&
        bullet.x + BULLET_SIZE > enemy.x &&
        bullet.y < enemy.y + ENEMY_SIZE &&
        bullet.y + BULLET_SIZE > enemy.y
      ) {
        setScore((prevScore) => prevScore + 1);
        enemies.splice(index, 1);
      }
    });
  });

  // Check player-powerup collisions
  powerUps.forEach((powerUp, index) => {
    if (
      playerX < powerUp.x + POWERUP_SIZE &&
      playerX + PLAYER_WIDTH > powerUp.x &&
      GAME_HEIGHT - PLAYER_HEIGHT < powerUp.y + POWERUP_SIZE &&
      GAME_HEIGHT > powerUp.y
    ) {
      setDoubleBullets(true);
      setTimeout(() => setDoubleBullets(false), 5000);
      powerUps.splice(index, 1);
    }
  });
}
