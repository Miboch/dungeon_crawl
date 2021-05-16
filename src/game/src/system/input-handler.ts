import {AssetLoader} from '@game/src/system/asset-loader';

export class InputHandler {
  static _instance: InputHandler;

  static getInstance(): InputHandler {
    if (!InputHandler._instance) InputHandler._instance = new InputHandler();
    return InputHandler._instance;
  }

  private constructor() {

  }


  private setupEventListener() {
    window.addEventListener('keydown', (e) => {
      if (e.code == 'KeyD') {
      }

      if (e.code == 'KeyA') {
      }

      if (e.code == 'KeyW') {
      }

      if (e.code == 'KeyS') {
      }

      if (e.code == "Space") {
      }
    })
  }


}
