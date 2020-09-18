import { Container, Text } from 'pixi.js';
import { GAME_WIDTH } from "./const";
import { SceneLauncher } from './sceneLauncher';

const FONT_SIZE = 60;

export function initGreetingScene() {
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