import {createDispatchEvent} from './dispatch-event';
import {Coordinate} from '@game/index';

export enum InputEventTypes {
  PLAYER_MOVE_UP = "[Player Move] Up",
  PLAYER_MOVE_DOWN = "[Player Move] Down",
  PLAYER_MOVE_LEFT = "[Player Move] Left",
  PLAYER_MOVE_RIGHT = "[Player Move] Right",
  PLAYER_SPRINT = '[Player Move] toggle sprint',
  DEBUG = '[DEBUG] Debugging event',
  LEFT_CLICK = '[Mouse] Left click',
  RIGHT_CLICK = '[Mouse] Right click'
}

export enum ClickTypes {
  LEFT = 0,
  RIGHT = 2
}

export const playerMoveUp = createDispatchEvent(InputEventTypes.PLAYER_MOVE_UP);
export const playerMoveDown = createDispatchEvent(InputEventTypes.PLAYER_MOVE_DOWN);
export const playerMoveLeft = createDispatchEvent(InputEventTypes.PLAYER_MOVE_LEFT);
export const playerMoveRight = createDispatchEvent(InputEventTypes.PLAYER_MOVE_RIGHT);
export const playerSprint = createDispatchEvent(InputEventTypes.PLAYER_SPRINT);
export const debugEvent = createDispatchEvent(InputEventTypes.DEBUG);

export const clickEvent = (type: InputEventTypes, coordinate: Coordinate) => {
  const event = createDispatchEvent(type);
  event.data = coordinate;
  return event;
}
