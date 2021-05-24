import {DispatchEvent, GameEntity, InputEventTypes, EventListener, EventBus} from '@game/index';

export class PlayerController implements EventListener {
  speed: number;
  entity!: GameEntity

  constructor(e?: GameEntity, props: any = {}) {
    if (e) {
      this.attachEntity(e);
    }
    this.speed = props?.speed || 300;
    EventBus.getInstance().addListener(this);
  }

  handleEvent(deltaTime: number, event: DispatchEvent) {
    switch (event.eventName) {
      case InputEventTypes.DEBUG:
        console.log("Sequence detected: K K W");
        break;
      case InputEventTypes.PLAYER_MOVE_UP:
        this.moveUp(deltaTime);
        break;
      case InputEventTypes.PLAYER_MOVE_DOWN:
        this.moveDown(deltaTime);
        break;
      case InputEventTypes.PLAYER_MOVE_LEFT:
        this.moveLeft(deltaTime);
        break;
      case InputEventTypes.PLAYER_MOVE_RIGHT:
        this.moveRight(deltaTime);
        break;
      case InputEventTypes.LEFT_CLICK:
      case InputEventTypes.RIGHT_CLICK:
        console.log(event);
        break;
    }
  }

  attachEntity(e: GameEntity) {
    this.entity = e;
  }

  moveUp(deltaTime: number) {
    this.entity.transform.y -= this.speed * deltaTime;
  }

  moveDown(deltaTime: number) {
    this.entity.transform.y += this.speed * deltaTime;
  }

  moveLeft(deltaTime: number) {
    this.entity.transform.x -= this.speed * deltaTime;
  }

  moveRight(deltaTime: number) {
    this.entity.transform.x += this.speed * deltaTime;
  }

}
