import { Application, Assets, Sprite, Texture } from 'pixi.js';

const app = new Application({
  resizeTo: window,
  backgroundColor: 0xeeeeee
});
document.body.appendChild(app.view);

let count = 0;
const counter = document.getElementById('counter');

Assets.load([
  '/assets/image.png',
  '/assets/image_open.png',
]).then(() => {
  const closedTexture = Texture.from('/assets/image.png');
  const openTexture = Texture.from('/assets/image_open.png');
  const popSound = new Audio('/assets/pop.mp3');

  const cat = new Sprite(closedTexture);
  cat.anchor.set(0.5);
  cat.interactive = true;
  cat.cursor = 'pointer';
  app.stage.addChild(cat);

  function resizeCat() {
    cat.x = app.screen.width / 2;
    cat.y = app.screen.height / 2;
    const scale = Math.min(app.screen.width / 600, app.screen.height / 600);
    cat.scale.set(scale);
  }

  resizeCat();
  window.addEventListener('resize', resizeCat);

  cat.on('pointerdown', () => {
    cat.texture = openTexture;
    count++;
    counter.innerText = count;
    popSound.currentTime = 0;
    popSound.play();
  });

  cat.on('pointerup', () => {
    cat.texture = closedTexture;
  });

  cat.on('pointerupoutside', () => {
    cat.texture = closedTexture;
  });
});
