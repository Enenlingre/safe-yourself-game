import { AnimatedSprite, Texture, Rectangle, BaseTexture } from 'pixi.js';

export function getAnimatedSprite(src) {
  const texture = BaseTexture.from(src);

  const frames = Array.from(Array(3), (_, i) => {
    const size = 50;
    const x = size * i;

    return new Texture(texture, new Rectangle(x + 0, 0, size, size));
    
  });

  const animatedSprite = new AnimatedSprite(frames);
  animatedSprite.animationSpeed = 0.12

  return animatedSprite;
}
