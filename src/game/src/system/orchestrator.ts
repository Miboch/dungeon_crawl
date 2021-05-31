import {
  AssetLoader, Clock, debugEvent, EventBus, GameEntity, InputHandler, Key, playerMoveDown, playerMoveLeft,
  playerMoveRight, playerMoveUp, playerSprint, Renderer, Transform
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
    const loader = AssetLoader.getInstance(); // begin preloading assets.
    const event = EventBus.getInstance();
    const input = InputHandler.getInstance(); // register key event handler etc.
    const renderer = Renderer.getInstance();
    const clock = Clock.getInstance();
    this.mapEvents(input);

    // timers
    clock.addContinuousObserver((n) => renderer.drawGame());
    clock.addPausableObserver((n) => input.frame(n));
    clock.addPausableObserver((n) => event.flush(n));

    // testing
    // const e = new GameEntity(loader.getSprite('player'), new Transform())
    // const t = new GameEntity(loader.getSprite('test'), new Transform(200, 200));
    // const controller = new PlayerController(e)
    //
    // this.gameEntities.push(e);
    // this.gameEntities.push(t);

    this.bootstrapped = true;
    Clock.getInstance().setPause(false);
  }

  mapEvents(input: InputHandler) {
    input.addKey(this.key.W, playerMoveUp);
    input.addKey(this.key.S, playerMoveDown);
    input.addKey(this.key.A, playerMoveLeft);
    input.addKey(this.key.D, playerMoveRight);
    input.addKeySequence([Key.K, Key.K], debugEvent);
    input.addKeyToggle(this.key.SHIFT_LEFT, playerSprint)
  }

}
