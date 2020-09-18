import { Sprite, Container, Text } from 'pixi.js';
import heroImage from './sprites/hero.png';
import hairyImage from './sprites/hairy.png';
import baldImage from './sprites/bald.png';
import backgroundImage from './sprites/background.jpg';
import { GAME_WIDTH, FONT_SIZE, GAME_HEIGHT } from "./const";
import { SceneLauncher } from './sceneLauncher';
import { getAnimatedSprite } from './getAnimatedSprite';

export function init() {
  const global = window.data;
  const { app } = global;

  // start all scene initialization
  const greetingScene = initGreetingScene();
  app.stage.addChild(greetingScene);

  const gameScene = new Container();
  app.stage.addChild(gameScene);
  
  const gameOverScene = new Container();
  app.stage.addChild(gameOverScene);
  // end scene initialization

  // start all sprite initialization
  const background = Sprite.from(backgroundImage);
  gameScene.addChild(background); 

  global.hero = getAnimatedSprite(heroImage);
  gameScene.addChild(hero);

  global.nonHeroes = [hairyImage, baldImage].map(image => {
    const sprite = getAnimatedSprite(image)
    gameScene.addChild(sprite);
    return sprite;
  });
  // end all sprite initialization
}




//   hero.vx = 0;
//   hero.vy = 0;

//   gameScene.addChild(hero);
  
//   let numberOfBlobs = 2,    spacing = 48,    xOffset = 150,    speed = 2,    direction = 1;

//   // image.x = randomInt(GAME_MARGIN, GAME_WIDTH - image.width);
//   // image.y = randomInt(GAME_MARGIN, GAME_HEIGHT - image.height);


//   for (let i = 0; i < numberOfBlobs; i++) {
//     //Make a blob  
//     let blob = getAnimatedSprite(i === 0 ? hairyImage : baldImage);
//     //Space each blob horizontally according to the `spacing` value.
//     //`xOffset` determines the point from the left of the screen
//     //at which the first blob should be added  
//     let x = spacing * i + xOffset;
//     //Give the blob a random y position  
//     const randomInt = (min, max) => (Math.random() * max) + min;
//     let y = randomInt(0, app.stage.height - blob.height);
//     //Set the blob's position  
//     blob.x = x;  
//     blob.y = y;
//     //Set the blob's vertical velocity. `direction` will be either `1` or
//     //`-1`. `1` means the enemy will move down and `-1` means the blob will
//     //move up. Multiplying `direction` by `speed` determines the blob's
//     //vertical direction  
//     blob.vy = speed * direction;
//     //Reverse the direction for the next blob  
//     direction *= -1;
//     //Push the blob into the `blobs` array  
//     nonPlayerCharacters.push(blob);
//     //Add the blob to the `gameScene`  
//     gameScene.addChild(blob);
//   }

//   const keyboard = createKeybord()
//   .addKey('KeyW', () => {
//     hero.vy = -1;
//     hero.play();
//   }, () => {
//     hero.vy = 0;
//     hero.stop();
//   })
//   .addKey('KeyS', () => {
//     hero.vy = 1
//     hero.gotoAndPlay(1);
//   }, () => {
//     hero.vy = 0;
//     hero.gotoAndStop(0);
//   })
//   .addKey('KeyA', () => {
//     console.log(hero);
//     hero.vx = -1;
//     console.log('erer');
//   }, () => {
//     hero.vx = 0;
//   })
//   .addKey('KeyD', () => {
//     hero.vx = +1;
//     console.log('erer');
//   }, () => {
//     hero.vx = 0;
//   })
//   .subscrube();

//   state = play;

//   app.ticker.add(delta => gameLoop(delta));
// }

function initGreetingScene() {
  const greetingScene =  new Container();
  
  ['SAFE', 'YOURSELF', 'GAME'].map((text, i) => {
    const textObject = new Text(text, { fontSize: FONT_SIZE, fill: "red" });
    textObject.position = { x: (GAME_WIDTH - textObject.width) / 2, y:  (i + 1) * FONT_SIZE };
    
    return textObject;
  }).forEach(textObject => {
    greetingScene.addChild(textObject); 
  });

  const greetingSceneLauncher = new SceneLauncher(greetingScene);

  function startGame() {
    greetingSceneLauncher.stop();
  }

  window.addEventListener('keypress', startGame);

  return greetingScene;
}
