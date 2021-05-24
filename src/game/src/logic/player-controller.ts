import {DispatchEvent, GameEntity, InputEventTypes, EventListener, EventBus, ToggleEvent} from '@game/index';

export class PlayerController implements EventListener {
  speed: number;
  entity!: GameEntity
  sprinting: boolean;
  sprintSpeed: number;

  constructor(e?: GameEntity, props: any = {}) {
    if (e) {
      this.attachEntity(e);
    }
    this.speed = props?.speed || 300;
    this.sprintSpeed = this.speed * 1.8;
    EventBus.getInstance().addListener(this);
    this.sprinting = false;
  }

  handleEvent(deltaTime: number, event: DispatchEvent) {
    switch (event.eventName) {
      case InputEventTypes.DEBUG:
        console.log("Sequence detected: K K");
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
      case InputEventTypes.PLAYER_SPRINT:
        this.handleSprint(event.data as ToggleEvent)
    }
  }

  attachEntity(e: GameEntity) {
    this.entity = e;
  }

  moveUp(deltaTime: number) {
    const spd = this.sprinting ? this.sprintSpeed : this.speed;
    this.entity.transform.y -= spd * deltaTime;
  }

  moveDown(deltaTime: number) {
    const spd = this.sprinting ? this.sprintSpeed : this.speed;
    this.entity.transform.y += spd * deltaTime;
  }

  moveLeft(deltaTime: number) {
    const spd = this.sprinting ? this.sprintSpeed : this.speed;
    this.entity.transform.x -= spd * deltaTime;
  }

  moveRight(deltaTime: number) {
    const spd = this.sprinting ? this.sprintSpeed : this.speed;
    this.entity.transform.x += spd * deltaTime;
  }

  handleSprint(data: ToggleEvent) {
    this.sprinting = data.toggle;
  }

}
