import { Application, Loader, Sprite, Container } from 'pixi.js';
import { init } from './init';
import { createKeybord } from './createKeybord';
import { contain } from './contain';
import { checkCollisionRect } from './checkCollisionRect';

import { GAME_WIDTH, GAME_HEIGHT } from './const';

window.data = {};
const global = window.data;

const app = new Application({ width: GAME_WIDTH, height: GAME_HEIGHT });
global.app = app;

app.renderer.view.style.position = "absolute";
app.renderer.view.style.left = "50%";
app.renderer.view.style.top = "50%";
app.renderer.view.style.transform = "translate(-50%, -50%)";

document.body.appendChild(app.view);

const loader = new Loader();

loader
  .load(init);

let hero, greetingScene, gameScene, gameOverScene;

let state;
const nonPlayerCharacters = [];

  
  
    // sprite.play();

function gameLoop(delta){

  state(delta);
}

const CONTAINER = { x: 5, y: 10, height: 490, width: 495 };
let v = [0.5, 0.5];
const randomInt = (min, max) => Math.round(min + Math.random() * (max - min));
// setInterval(() => v = randomInt(0.5, 1), 5000);
let inddd = null;
let count = 0;
let imt = randomInt(0, 1);
function play() {
  //Apply the velocity values to the cat's 
  //position to make it move
  hero.x += hero.vx;
  hero.y += hero.vy;

  contain(hero, CONTAINER);
   
  nonPlayerCharacters.forEach((blob, i) => {
    const nonPlayerCharacter = blob;
    if (checkCollisionRect(nonPlayerCharacter, hero)) console.log('end');
    // console.log(blobs[0].x, blobs[1].x, i);
    // const v = randomInt(0, 1);
    // console.log(inddd);
    if (checkCollisionRect(nonPlayerCharacters[0], nonPlayerCharacters[1]) && inddd === null) {inddd = i;
      // blob.x -= sprite.x  > blob.x ? 0.5 : sprite.x == blob.x ? 0 : -0.5;
      // blob.y -= sprite.y  > blob.y ? 0.5 : sprite.y == blob.y ? 0 : -0.5;
      imt = randomInt(0, 1);
      const index = i === 0 ? 1 : 0;
      if (imt) 
      blob.x += blob.x > nonPlayerCharacters[index].x ? 1 : -1;
      else blob.y += blob.y > nonPlayerCharacters[index].y ? 1 : -1;
    } else {
      blob.x += hero.x  > blob.x ? v[i] : hero.x == blob.x ? 0 : -v[i];
      blob.y += hero.y  > blob.y ? v[i] : hero.y == blob.y ? 0 : -v[i];
    }
    if (inddd === i && count < 100) {
      const index = i === 0 ? 1 : 0;
      if (imt) 
      blob.x += blob.x > nonPlayerCharacters[index].x ? 1 : -1
      else blob.y += blob.y > nonPlayerCharacters[index].y ? 1 : -1
      count++;
    } 
    if (inddd === i && count === 100) {
      count = 0;
      inddd = null;
    }
  });
}

function end() {

}
