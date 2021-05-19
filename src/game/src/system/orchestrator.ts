import {
  AssetLoader,
  Clock, EventBus, GameEntity,
  InputHandler,
  Key,
  playerMoveDown,
  playerMoveLeft, playerMoveRight,
  playerMoveUp,
  Renderer, Transform
} from '@game/index';
import {PlayerController} from '@game/src/logic/player-controller';

export class Orchestrator {

  /**
   * should not be directly accessed. Use Orchestrator.getInstance() instead.
   */
  static _instance: Orchestrator;

  static getInstance(): Orchestrator {
    if (!Orchestrator._instance) Orchestrator._instance = new Orchestrator();
    return Orchestrator._instance;
  }

  key = Key;
  bootstrapped = false;
  gameEntities: GameEntity[];

  private constructor() {
    this.gameEntities = [];
  }

  bootstrapGame() {
    if (this.bootstrapped) return;
    Clock.getInstance(); // instantiates and starts the timer.
    AssetLoader.getInstance(); // begin preloading assets.
    const event = EventBus.getInstance();
    const input = InputHandler.getInstance(); // register key event handler etc.
    const renderer = Renderer.getInstance();

    input.mapKeyEvent(this.key.W, playerMoveUp)
    input.mapKeyEvent(this.key.S, playerMoveDown)
    input.mapKeyEvent(this.key.A, playerMoveLeft)
    input.mapKeyEvent(this.key.D, playerMoveRight)

    Clock.getInstance().addContinuousObserver((n) => renderer.drawGame());
    Clock.getInstance().addPausableObserver((n) => input.raiseEvents());
    Clock.getInstance().addPausableObserver((n) => event.flush(n));
    const e = new GameEntity(AssetLoader.getInstance().getSprite('player'), new Transform())
    const controller = new PlayerController(e)
    this.gameEntities.push(e);
    this.bootstrapped = true;
    Clock.getInstance().setPause(false);
  }

}
