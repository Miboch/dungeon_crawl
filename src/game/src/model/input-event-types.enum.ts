import {createDispatchEvent} from './dispatch-event';

export enum InputEventTypes {
  PLAYER_MOVE_UP = "[Player Move] Up",
  PLAYER_MOVE_DOWN = "[Player Move] Down",
  PLAYER_MOVE_LEFT = "[Player Move] Left",
  PLAYER_MOVE_RIGHT = "[Player Move] Right"
}


export const playerMoveUp = createDispatchEvent(InputEventTypes.PLAYER_MOVE_UP);
export const playerMoveDown = createDispatchEvent(InputEventTypes.PLAYER_MOVE_DOWN);
export const playerMoveLeft = createDispatchEvent(InputEventTypes.PLAYER_MOVE_LEFT);
export const playerMoveRight = createDispatchEvent(InputEventTypes.PLAYER_MOVE_RIGHT);
