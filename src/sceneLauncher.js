export function SceneLauncher(scene) {
  this.scene = scene;
}

AlphaSetter.prototype = {
  animationStep: function animationStep() {
    this.container.alpha += this.alphaDelta;
  
      if (this.container.alpha !== 0 && this.container.alpha !== 1) 
        requestAnimationFrame(animationStep);
  },
  sceneStart: function() {
    this.alphaDelta = 0.1;

    requestAnimationFrame(this.animationStep);
  },
  sceneStop: function(v) {
    this.alphaDelta = -0.1;

    requestAnimationFrame(this.animationStep);
  }
}
