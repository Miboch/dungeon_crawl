import {DispatchEvent} from '@game/src/model';

export class EventBus {
  static _instance: EventBus;

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
