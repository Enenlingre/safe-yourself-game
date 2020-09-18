import { GAME_WIDTH } from "./const";
import { waiting } from "./waiting";
import { setup } from "./setup";

export function end() {
  const global = window.data;
  const { gameStartTime, score, gameSceneLauncher, gameOverSceneLauncher } = global;

  score.text = `${Math.ceil((performance.now() - gameStartTime) / 1000)}s`;
  score.x = (GAME_WIDTH - score.width) / 2;

  gameSceneLauncher.stop();
  gameOverSceneLauncher.start();

  function startGame() {
    gameOverSceneLauncher.stop();
    gameSceneLauncher.start();
    global.state = setup;

    window.removeEventListener('keypress', startGame);
  }

  setTimeout(function() {
    window.addEventListener('keypress', startGame);
  }, 500);

  global.state = waiting;
}
