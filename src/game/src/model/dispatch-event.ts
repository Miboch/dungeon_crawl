import {Coordinate, ToggleEvent} from '@game/index';

export class DispatchEvent {
  constructor(public eventName: string, public data: Coordinate | ToggleEvent | {} = {}) {
  }
}

export const createDispatchEvent = (name: string) => new DispatchEvent(name)
export const createToggleEvent = (name: string, toggleState: boolean) => new DispatchEvent(name, {toggle: toggleState})
