import {AssetLoader, RenderingContext, Transform} from '@game/index';
import {GameEntity} from '@game/src/model/game-entity';

export class Renderer {
  private context!: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;

  static _instance: Renderer

  static getInstance(): Renderer {
    if (!Renderer._instance) {
      Renderer._instance = new Renderer();
    }
    return Renderer._instance;
  }

  private constructor() {
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext(RenderingContext.SIMPLE) as CanvasRenderingContext2D;
  }

  setDimension(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  drawGame() {
    if (this.context) {
      this.clear();
      this.drawScene();
      this.drawSprites();
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillRect(0, 0, this.width, this.height);
  }

  drawScene() {

  }

  drawSprites() {
    const e = new GameEntity(AssetLoader.getInstance().getSprite('player'), new Transform())
    if (e.sprite.spriteReady)
      this.context.drawImage(e.sprite.imageData, e.transform.x, e.transform.y);
  }


}
