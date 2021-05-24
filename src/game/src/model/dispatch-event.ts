import {Coordinate} from '@game/index';

export class DispatchEvent {
  constructor(public eventName: string, public data: Coordinate | {} = {}) {
  }
}

export const createDispatchEvent = (name: string) => new DispatchEvent(name)
