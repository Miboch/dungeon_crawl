import {DispatchEvent} from '@game/src/model';
import {EventListener} from '@game/src/model/event-listener';

export class EventBus {
  static _instance: EventBus;

  static getInstance(): EventBus {
    if (!EventBus._instance) EventBus._instance = new EventBus();
    return EventBus._instance;
  }

  listeners: EventListener[];
  events: DispatchEvent[]

  private constructor() {
    this.listeners = [];
    this.events = [];
  }

  raise(event: DispatchEvent) {
    this.events.push(event);
  }

  flush(deltaTime: number) {
    const eventCopy = this.events.slice();
    this.events = [];
    eventCopy.forEach(event => {
      this.listeners.forEach(observer => {
        observer.handleEvent(deltaTime, event);
      });
    });
  }

  addListener(listener: EventListener) {
    this.listeners.push(listener);
  }

}
