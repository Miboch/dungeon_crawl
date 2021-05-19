export class DispatchEvent {
  constructor(public eventName: string, public toggle = false) {
  }
}

export const createDispatchEvent = (name: string, toggle = false) => new DispatchEvent(name, toggle)
