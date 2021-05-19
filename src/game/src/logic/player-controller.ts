import {GameEntity, InputEventTypes} from '@game/src/model';
import {EventBus} from '@game/src/system';

export class PlayerController {
  speed: number;
  entity!: GameEntity

  constructor(e?: GameEntity, props: any = {}) {
    if (e) {
      this.attachEntity(e);
    }
    this.speed = props?.speed || 100;
    const events = EventBus.getInstance();
    events.registerEvent(InputEventTypes.PLAYER_SPRINT, () => {});
    events.registerEvent(InputEventTypes.PLAYER_MOVE_UP, this.moveUp.bind(this));
    events.registerEvent(InputEventTypes.PLAYER_MOVE_DOWN, this.moveDown.bind(this));
    events.registerEvent(InputEventTypes.PLAYER_MOVE_LEFT, this.moveLeft.bind(this));
    events.registerEvent(InputEventTypes.PLAYER_MOVE_RIGHT, this.moveRight.bind(this));

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
