import {entityIdGenerator} from '@game/src/utility';
import {Sprite, Transform} from '@game/index';

export class GameEntity {
  id: number;

  constructor(public sprite: Sprite, public transform: Transform) {
    this.id = entityIdGenerator.next().value as number;
  }
}
