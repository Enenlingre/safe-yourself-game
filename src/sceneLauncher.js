export function SceneLauncher(scene) {
  this.scene = scene;
}

SceneLauncher.prototype = {
  start: function() {
    alphaAnimation(this.scene, 0.1);
  },
  stop: function() {
    alphaAnimation(this.scene, -0.1);
  }
}

function alphaAnimation(scene, delta) {
  function animationStep() {
    scene.alpha += delta;

    if (scene.alpha >=0 && scene.alpha <= 1) 
        requestAnimationFrame(animationStep);
  }

  requestAnimationFrame(animationStep);
}