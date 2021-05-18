export class DispatchEvent {
  constructor(public eventName: string) {
  }
}

export const createDispatchEvent = (name: string) => new DispatchEvent(name)
