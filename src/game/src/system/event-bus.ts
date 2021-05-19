import {DispatchEvent, InputEventTypes} from '@game/src/model';

export class EventBus {
  static _instance: EventBus;
  inputEvents = InputEventTypes;

  static getInstance(): EventBus {
    if (!EventBus._instance) EventBus._instance = new EventBus();
    return EventBus._instance;
  }

  observableMap: { [eventName: string]: Array<(deltaTime: number) => void> }
  events: DispatchEvent[]

  private constructor() {
    this.observableMap = {};
    this.events = [];
    this.setupObservableMap();
  }

  setupObservableMap() {
    Object.values(this.inputEvents).forEach(v => {
      this.observableMap[v] = [];
    })
  }

  registerEvent(eventName: string, callback: (n: number) => void) {
    this.observableMap[eventName].push(callback);
  }

  raise(event: DispatchEvent) {
    this.events.push(event);
  }


  flush(deltaTime: number) {
    this.events.forEach(event => {
      if (event.eventName in this.observableMap) {
        this.observableMap[event.eventName].forEach(fn => {
          fn(deltaTime);
        })
      }
    });
    this.events = [];
  }

}
