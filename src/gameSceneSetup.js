import { randomInt } from './randomInt';
import { GAME_WIDTH, GAME_HEIGHT } from './const';

export function gameSceneSetup() {
  const global = window.data;
  const { app, hero, nonHeroes } = global;

  hero.vx = 0;
  hero.vy = 0;

  hero.x = randomInt(GAME_MARGIN, (GAME_WIDTH / 2) - hero.width - GAME_MARGIN);
  hero.y = randomInt(GAME_MARGIN, (GAME_HEIGHT / 2) - hero.height - GAME_MARGIN);

  nonHeroes.forEach(nonHero => {
    nonHero.x = randomInt(halfGameWidth, GAME_WIDTH - nonHero.width - GAME_MARGIN);
    nonHero.y = randomInt(halfGameWidth, GAME_HEIGHT - nonHero.height - GAME_MARGIN);
  });
}