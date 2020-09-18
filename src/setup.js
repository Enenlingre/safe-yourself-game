import { randomInt } from './randomInt';
import { GAME_WIDTH, GAME_HEIGHT, GAME_MARGIN } from './const';
import { play } from './play';

export function setup() {
  const global = window.data;
  const { hero, nonHeroes, gameSceneKeybord } = global;

  hero.vx = 0;
  hero.vy = 0;

  hero.x = randomInt(GAME_MARGIN, GAME_WIDTH - hero.width - GAME_MARGIN);
  hero.y = randomInt(GAME_MARGIN, (GAME_HEIGHT / 2) - hero.height - GAME_MARGIN);

  nonHeroes.forEach(nonHero => {
    nonHero.x = randomInt(GAME_MARGIN, GAME_WIDTH - nonHero.width - GAME_MARGIN);
    nonHero.y = randomInt(GAME_HEIGHT / 2, GAME_HEIGHT - nonHero.height - GAME_MARGIN);
  });

  gameSceneKeybord.subscribe();

  global.gameStartTime = performance.now();
  
  global.state = play;
}