import * as PIXI from 'pixi.js';
import hero from './hero.png';


console.log(1);
// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application();

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
 
// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

const loader = new PIXI.Loader();

loader.add(hero)
  .load(setup);

function setup() {
  let sprite = new PIXI.Sprite(
    loader.resources[hero].texture
  );
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