import {AssetLoader, Orchestrator, RenderingContext, Transform} from '@game/index';
import {GameEntity} from '@game/src/model/game-entity';

export class Renderer {
  private context!: WebGLRenderingContext;
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
    this.context = canvas.getContext(RenderingContext.GL) as WebGLRenderingContext;
    this.context.clearColor(0, 0, 0, 1);
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
    this.context.clear(this.context.COLOR_BUFFER_BIT);
  }

  drawScene() {

  }

  drawSprites() {
    // const e = Orchestrator.getInstance().gameEntities;
    // for (let i = 0; i < e.length; i++) {
    //   if (!e[i].sprite.spriteReady) continue;
    //   this.context.drawImage(e[i].sprite.imageData, e[i].transform.x, e[i].transform.y)
    // }

  }

  getContext(): WebGLRenderingContext {
    return this.context;
  }


}

export var ctx: WebGLRenderingContext;
