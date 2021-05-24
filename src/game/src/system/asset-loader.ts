import {Sprite, SpriteMapping} from '@game/index';
import * as spriteData from './../../../generated/spritemap.json';


export class AssetLoader {

  /**
   * should not be directly accessed. Use AssetLoader.getInstance() instead.
   */
  static _instance: AssetLoader

  static getInstance(): AssetLoader {
    if (!AssetLoader._instance) {
      AssetLoader._instance = new AssetLoader();
    }
    return AssetLoader._instance;
  }

  private sprites: { [name: string]: Sprite }

  private constructor() {
    this.sprites = {};
    this.setupPreparedSprites();
  }

  addSprite(name: string, fileName: string) {
    if (this.sprites[name]) return;
    this.sprites[name] = new Sprite(`/game/game-assets/${fileName}`);
  }

  getSprite(name: string): Sprite {
    return this.sprites[name];
  }

  private setupPreparedSprites() {
    const data = (<any>spriteData).default as SpriteMapping[];
    data.forEach(mapping => {
      this.addSprite(mapping.name, mapping.file)
    })
  }

}
