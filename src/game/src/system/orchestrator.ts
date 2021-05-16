import {AssetLoader, Clock, Renderer} from '@game/index';

export class Orchestrator {

  /**
   * should not be directly accessed. Use Orchestrator.getInstance() instead.
   */
  static _instance: Orchestrator;

  static getInstance(): Orchestrator {
    if (!Orchestrator._instance) Orchestrator._instance = new Orchestrator();
    return Orchestrator._instance;
  }

  bootstrapped = false;

  private constructor() {
  }

  bootstrapGame() {
    if (this.bootstrapped) return;
    Clock.getInstance(); // instantiates and starts the timer.
    AssetLoader.getInstance() // begin preloading assets.
    Clock.getInstance().addContinuousObserver((n) => Renderer.getInstance().drawGame());
  }

}
