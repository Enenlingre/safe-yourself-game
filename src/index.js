import { Application, Loader, Sprite, Container, Text } from 'pixi.js';
import { getAnimatedSprite } from './getAnimatedSprite';
import { createKeybord } from './createKeybord';
import { contain } from './contain';
import { checkCollisionRect } from './checkCollisionRect';
import hero from './sprites/hero.png';
import hairy from './sprites/hairy.png';
import bald from './sprites/bald.png';
import background from './sprites/background.jpg';
import { initGreetingScene } from './greetingScene';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new Application({ width: 500, height: 500 });

app.renderer.view.style.position = "absolute";
app.renderer.view.style.left = "50%";
app.renderer.view.style.top = "50%";
app.renderer.view.style.transform = "translate(-50%, -50%)";

app.renderer.view.style.display = "block";
// app.renderer.autoResize = true;
// app.renderer.resize(window.innerWidth, window.innerHeight);
 
// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

const loader = new Loader();

loader.add(background)
  .load(setup);

let sprite, greetingScene, gameScene, gameOverScene;

let state;
const nonPlayerCharacters = [];
function setup() {
  greetingScene = initGreetingScene();

  gameScene = new Container();
  app.stage.addChild(gameScene);
  
  gameOverScene = new Container();
  app.stage.addChild(gameOverScene);

  const er = new Sprite(loader.resources[background].texture);
  gameScene.addChild(er); 
  gameScene.addChild(safe); 
  gameScene.addChild(yourself); 

  // const animatedSprite = new AnimatedSprite(json.animations["ahero"]);

  sprite = getAnimatedSprite(hero);

  sprite.vx = 0;
  sprite.vy = 0;

  gameScene.addChild(sprite);
  
  let numberOfBlobs = 2,    spacing = 48,    xOffset = 150,    speed = 2,    direction = 1;

  for (let i = 0; i < numberOfBlobs; i++) {
    //Make a blob  
    let blob = getAnimatedSprite(i === 0 ? hairy : bald);
    //Space each blob horizontally according to the `spacing` value.
    //`xOffset` determines the point from the left of the screen
    //at which the first blob should be added  
    let x = spacing * i + xOffset;
    //Give the blob a random y position  
    const randomInt = (min, max) => (Math.random() * max) + min;
    let y = randomInt(0, app.stage.height - blob.height);
    //Set the blob's position  
    blob.x = x;  
    blob.y = y;
    //Set the blob's vertical velocity. `direction` will be either `1` or
    //`-1`. `1` means the enemy will move down and `-1` means the blob will
    //move up. Multiplying `direction` by `speed` determines the blob's
    //vertical direction  
    blob.vy = speed * direction;
    //Reverse the direction for the next blob  
    direction *= -1;
    //Push the blob into the `blobs` array  
    nonPlayerCharacters.push(blob);
    //Add the blob to the `gameScene`  
    gameScene.addChild(blob);
  }
  
  
    // sprite.play();

  const keyboard = createKeybord()
    .addKey('KeyW', () => {
      sprite.vy = -1;
      sprite.play();
    }, () => {
      sprite.vy = 0;
      sprite.stop();
    })
    .addKey('KeyS', () => {
      sprite.vy = 1
      sprite.gotoAndPlay(1);
    }, () => {
      sprite.vy = 0;
      sprite.gotoAndStop(0);
    })
    .addKey('KeyA', () => {
      console.log(sprite);
      sprite.vx = -1;
      console.log('erer');
    }, () => {
      sprite.vx = 0;
    })
    .addKey('KeyD', () => {
      sprite.vx = +1;
      console.log('erer');
    }, () => {
      sprite.vx = 0;
    })
    .subscrube();

  state = play;

  app.ticker.add(delta => gameLoop(delta));
}

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
  sprite.x += sprite.vx;
  sprite.y += sprite.vy;

  contain(sprite, CONTAINER);
   
  nonPlayerCharacters.forEach((blob, i) => {
    // console.log(blobs[0].x, blobs[1].x, i);
    // const v = randomInt(0, 1);
    console.log(inddd);
    if (checkCollisionRect(nonPlayerCharacters[0], nonPlayerCharacters[1]) && inddd === null) {inddd = i;
      // blob.x -= sprite.x  > blob.x ? 0.5 : sprite.x == blob.x ? 0 : -0.5;
      // blob.y -= sprite.y  > blob.y ? 0.5 : sprite.y == blob.y ? 0 : -0.5;
      imt = randomInt(0, 1);
      const index = i === 0 ? 1 : 0;
      if (imt) 
      blob.x += blob.x > nonPlayerCharacters[index].x ? 1 : -1;
      else blob.y += blob.y > nonPlayerCharacters[index].y ? 1 : -1;
    } else {
      blob.x += sprite.x  > blob.x ? v[i] : sprite.x == blob.x ? 0 : -v[i];
      blob.y += sprite.y  > blob.y ? v[i] : sprite.y == blob.y ? 0 : -v[i];
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
