import {DispatchEvent} from '@game/src/model/dispatch-event';

export interface EventListener {
  handleEvent(deltaTime: number, event: DispatchEvent): void;
}
