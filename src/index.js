import { Application, Loader } from 'pixi.js';
import { init } from './init';
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

loader.load(init);

