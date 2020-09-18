import { Sprite, Container, Text, Graphics } from 'pixi.js';
import heroImage from './sprites/hero.png';
import hairyImage from './sprites/hairy.png';
import baldImage from './sprites/bald.png';
import bloodImage from './sprites/blood.png';
import backgroundImage from './sprites/background.jpg';
import { GAME_WIDTH, FONT_SIZE, GAME_HEIGHT, GAME_MARGIN, HERO_V } from "./const";
import { SceneLauncher } from './sceneLauncher';
import { getAnimatedSprite } from './getAnimatedSprite';
import { createKeybord } from './createKeybord';
import { setup } from './setup';
import { waiting } from './waiting';
import { randomInt } from './randomInt';

export function init() {
  const global = window.data;
  const { app } = global;

  // start all scene initialization
  const greetingScene = initGreetingScene();
  app.stage.addChild(greetingScene);
  const greetingSceneLauncher = new SceneLauncher(greetingScene);

  const gameScene = initGameScene();
  app.stage.addChild(gameScene);
  const gameSceneLauncher = new SceneLauncher(gameScene);
  global.gameSceneLauncher = gameSceneLauncher;

  const { gameOverScene, score } = initGameOverScene();
  app.stage.addChild(gameOverScene);
  const gameOverSceneLauncher = new SceneLauncher(gameOverScene);
  global.score = score;
  global.gameOverSceneLauncher = gameOverSceneLauncher;
  // end scene initialization

  function startGame() {
    greetingSceneLauncher.stop();
    gameSceneLauncher.start();
    global.state = setup;

    window.removeEventListener('keypress', startGame);
  }

  window.addEventListener('keypress', startGame);

  global.state = waiting;

  app.ticker.add(delta => gameLoop(delta));
}

function initGreetingScene() {
  const greetingScene =  new Container();

  const graphics = new Graphics();
  graphics.beginFill(0x333831);
  graphics.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  graphics.endFill();
  greetingScene.addChild(graphics);
  
  ['SAFE', 'YOURSELF', 'GAME'].map((text, i) => {
    const textObject = new Text(text, { fontSize: FONT_SIZE, fill: "red" });
    textObject.position = { x: (GAME_WIDTH - textObject.width) / 2, y:  (i + 1) * FONT_SIZE };
    
    return textObject;
  }).forEach(textObject => {
    greetingScene.addChild(textObject); 
  });

  return greetingScene;
}

function initGameScene() {
  const global = window.data;

  const gameScene = new Container();
  gameScene.alpha = 0;

  // start all sprite initialization
  const background = Sprite.from(backgroundImage);
  gameScene.addChild(background); 

  const hero = getAnimatedSprite(heroImage);
  gameScene.addChild(hero);
  global.hero = hero;

  const nonHeroes = [hairyImage, baldImage].map(image => {
    const sprite = getAnimatedSprite(image)
    sprite.play();
    gameScene.addChild(sprite);
    return sprite;
  });
  global.nonHeroes = nonHeroes;


  const bloodContainer = new Container();
  gameScene.addChild(bloodContainer);

  let i;
  const bloods = [];
  global.bloods = bloods;

  for (i = 0; i < 100; i++) {
    const blood = Sprite.from(bloodImage);

    blood.x = randomInt(GAME_MARGIN, GAME_WIDTH - GAME_MARGIN);
    blood.y = randomInt(GAME_MARGIN, GAME_HEIGHT - GAME_MARGIN);
    blood.scale = { x: 0.5, y: 0.5 };
    blood.alpha = 0.5;

    bloods.push(blood);
    bloodContainer.addChild(blood);
  }
  // end all sprite initialization

  global.gameSceneKeybord = createKeybord()
    .addKey(() => {
      hero.vy = -HERO_V;
      hero.play();
    }, () => {
      hero.vy = 0;
      hero.stop();
    },
    'KeyW', 'ArrowUp')
    .addKey(() => {
      hero.vy = HERO_V;
      hero.play();
    }, () => {
      hero.vy = 0;
      hero.stop();
    },
    'KeyS', 'ArrowDown')
    .addKey(() => {
      hero.vx = -HERO_V;
      hero.play();
    }, () => {
      hero.vx = 0;
      hero.stop();
    }, 
    'KeyA', 'ArrowLeft')
    .addKey(() => {
      hero.vx = HERO_V;
      hero.play();
    }, () => {
      hero.vx = 0;
      hero.stop();
    },
    'KeyD', 'ArrowRight');

    return gameScene;
}

function initGameOverScene() {
  const gameOverScene = new Container();
  gameOverScene.alpha = 0;

  const graphics = new Graphics();
  graphics.beginFill(0x333831);
  graphics.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  graphics.endFill();
  gameOverScene.addChild(graphics);

  let score;
  ['YOU', 'DEAD', 'you score:', '0'].map((text, i) => {
    const textObject = new Text(text, { fontSize: FONT_SIZE, fill: "red" });
    textObject.position = { 
      x: (GAME_WIDTH - textObject.width) / 2, 
      y:  (i + 1) * FONT_SIZE + (i > 1 ? FONT_SIZE : 0) 
    };
    
    return textObject;
  }).forEach((textObject, i) => {
    gameOverScene.addChild(textObject); 

    if (i === 3) score = textObject;
  });

  return { gameOverScene, score };
}

function gameLoop(delta){
  const global = window.data;
  const { state } = global;

  state(delta);
}
