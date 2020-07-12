import { Application, Loader, Sprite, Container, AnimatedSprite, Texture, Rectangle, BaseTexture } from 'pixi.js';
import { createKeybord } from './createKeybord';
import hero from './sprites/hero.png';
import background from './sprites/background.jpg';


console.log(1);
// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new Application();

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
 
// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

const loader = new Loader();

loader.add(background)
  .load(setup);

let sprite, gameScene, gameOverScene;

let state;

function setup() {
  gameScene = new Container();
  app.stage.addChild(gameScene);
  
  gameOverScene = new Container();
  app.stage.addChild(gameOverScene);

  const er = new Sprite(loader.resources[background].texture);
  gameScene.addChild(er); 

  // const animatedSprite = new AnimatedSprite(json.animations["ahero"]);

  sprite = getAnimatedSprite(hero);

  sprite.vx = 0;
  sprite.vy = 0;

  gameScene.addChild(sprite);
  sprite.play();

  const keyboard = createKeybord()
    .addKey('KeyW', () => {
      sprite.vy = -1;
      console.log('erer');
    }, () => {
      sprite.vy = 0;
    })
    .addKey('KeyS', () => {
      sprite.vy = 1
    }, () => {
      sprite.vy = 0;
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

function play() {
  //Apply the velocity values to the cat's 
  //position to make it move
  sprite.x += sprite.vx;
  sprite.y += sprite.vy;
}

function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};

function getAnimatedSprite(src) {
  const texture = BaseTexture.from(src);

  const frames = Array.from(Array(3), (_, i) => {
    const size = 50;
    const x = size * i;

    return  new Texture(texture, new Rectangle(x + 0, 0, size, size));
    
  });

  const animatedSprite = new AnimatedSprite(frames);
  animatedSprite.animationSpeed = 0.12

  return animatedSprite;
}
 
// // load the texture we need
// PIXI.loader.add('ss','/Users/develop/Documents/save-yourself-game/dist/hero.png').load((loader, resources) => {
 
//     // This creates a texture from a 'bunny.png' image.
//     const bunny = new PIXI.Sprite(resources['/Users/develop/Documents/save-yourself-game/dist/hero.png'].texture);
 
//     // Setup the position of the bunny
//     bunny.x = app.renderer.width / 2;
//     bunny.y = app.renderer.height / 2;
 
//     // Rotate around the center
//     bunny.anchor.x = 0.5;
//     bunny.anchor.y = 0.5;
 
//     // Add the bunny to the scene we are building.
//     app.stage.addChild(bunny);
 
//     // Listen for frame updates
//     app.ticker.add(() => {
//          // each frame we spin the bunny around a bit
//         bunny.rotation += 0.01;
//     });
// });