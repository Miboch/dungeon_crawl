import {DispatchEvent} from '@game/src/model/dispatch-event';

export interface KeyState {
  pressed: boolean;
  registeredEvents: DispatchEvent[]
}
