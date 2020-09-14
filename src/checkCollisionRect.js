export function checkCollisionRect(r1, r2) {
  const collizionX = Math.min(r1.x + r1.width, r2.x + r2.width) - Math.max(r1.x, r2.x) >= 0;
  const collizionY = Math.min(r1.y + r1.height, r2.y + r2.height) - Math.max(r1.y, r2.y) >= 0;
  
  return collizionX && collizionY;
};
