import { contain } from "./contain";
import { end } from "./end";
import { NON_HERO_V, NON_HERO_COLLISION_DELAY, CONTAINER, GAME_HEIGHT, GAME_MARGIN } from "./const";
import { randomInt } from "./randomInt";
import { checkCollisionRect } from "./checkCollisionRect";

let nonHeroCollision = false;

export function play() {
  const global = window.data;
  const { hero, nonHeroes, bloods } = global;

  hero.x += hero.vx;
  hero.y += hero.vy;

  contain(hero, CONTAINER);

  bloods.forEach(blood => {
    if (blood.y >= GAME_HEIGHT - GAME_MARGIN) blood.y = GAME_MARGIN;
    blood.y += (0.1 * randomInt(0, 10));
  })

  nonHeroes.forEach((nonHero, i) => {
    // hack to shrink to fit sprite
    const nonHeroShrink = { 
      x: nonHero.x - 20,
      y: nonHero.y - 10,
      width: nonHero.width - 20,
      height: nonHero.height - 5,
    };
    // hack to shrink to fit sprite
    const heroShrink = { 
      x: hero.x - 20,
      y: hero.y - 10,
      width: hero.width - 20,
      height: hero.height - 5,
    };
    if (checkCollisionRect(nonHeroShrink, heroShrink)) {
      global.state = end;
      return;
    }

    const anotherNonHeroIndex = i === 0 ? 1 : 0;

    if (nonHero.wasCollision) {
      changeSpeed(nonHero, nonHeroes[anotherNonHeroIndex], hero);
    } else if (checkCollisionRect(nonHeroes[0], nonHeroes[1]) && !nonHeroCollision) {
      nonHero.wasCollision = NON_HERO_COLLISION_DELAY;
      nonHeroCollision = true;

      nonHero.x += nonHero.x  > nonHeroes[anotherNonHeroIndex].x ? NON_HERO_V : -NON_HERO_V;
      nonHero.y += nonHero.y  > nonHeroes[anotherNonHeroIndex].y ? NON_HERO_V : -NON_HERO_V;
    } else {
      nonHero.x += hero.x  > nonHero.x ? NON_HERO_V : -NON_HERO_V;
      nonHero.y += hero.y  > nonHero.y ? NON_HERO_V : -NON_HERO_V;
    }
  });
}

const directions = ['x', 'y'];
let delta = 0
let direction = directions[randomInt(0, 1)];

function changeSpeed(nonHero, anotherNonHero, hero) {
  if (delta) {
    nonHero[direction] += delta;
  } else if (nonHero[direction] > anotherNonHero[direction]) {
    delta += nonHero[direction] < hero[direction] ? NON_HERO_V * 2 : 0;
  } else {
    delta += nonHero[direction] < hero[direction] ? 0 : -NON_HERO_V * 2;
  };

  nonHero.wasCollision--;
  if (!nonHero.wasCollision)  {
    nonHeroCollision = false;
    delta = 0;
    direction = directions[randomInt(0, 1)];
  }

  contain(nonHero, CONTAINER);
}
