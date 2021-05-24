import {clickEvent, ClickTypes, Coordinate, DispatchEvent, EventBus, InputEventTypes, Key, KeyState} from '@game/index';
import {SequenceKey} from '@game/src/model/sequence-key';

export class InputHandler {
  static _instance: InputHandler;

  static getInstance(): InputHandler {
    if (!InputHandler._instance) InputHandler._instance = new InputHandler();
    return InputHandler._instance;
  }

  private keys = Key;
  private readonly keyStateMap: { [key: string]: KeyState }
  private readonly sequenceStateMap: { [key: string]: KeyState }
  private readonly maxSequence = 10;
  private readonly sequenceKeyLifetime = 1500 / 1000;
  private readonly canvasRef: HTMLCanvasElement;

  private sequence: SequenceKey[] = [];
  private eventBus = EventBus.getInstance();

  private constructor() {
    this.keyStateMap = {};
    this.sequenceStateMap = {};
    this.setupEventListener();
    this.setupMap();
    this.canvasRef = document.querySelector('canvas') as HTMLCanvasElement; // add an ID instead, in case of more canvas elements in future.
  }

  private setupEventListener() {
    window.addEventListener('keydown', (e) => this.handleKeypress(e));
    window.addEventListener('keyup', (e) => this.handleKeypress(e, false));
    window.addEventListener('mousedown', (event) => this.handleMouseEvent(event));
    window.addEventListener('contextmenu', (event) => {
      if (event.target === this.canvasRef) event.preventDefault();
    });
  }

  private setupMap() {
    for (let key of Object.values(this.keys)) {
      this.keyStateMap[key] = {pressed: false, registeredEvents: [], tapEvents: []}
    }
  }

  private handleKeypress(event: KeyboardEvent, down: boolean = true) {
    if (this.isMappedKey(event.code)) {
      if (down) {
        this.keyStateMap[event.code].pressed = true;
        this.sequence.push({key: event.code, lifeTimeMS: this.sequenceKeyLifetime});
        this.checkForSequence();
      } else {
        this.keyStateMap[event.code].pressed = false;
      }
    }
  }

  private handleMouseEvent(event: MouseEvent) {
    if (event.target != this.canvasRef) return;
    event.preventDefault();
    const canvasBounds = this.canvasRef.getBoundingClientRect();
    const key = event.button as ClickTypes;
    if (key === ClickTypes.LEFT)
      this.handleClicks(InputEventTypes.LEFT_CLICK, [event.x - canvasBounds.x, event.y - canvasBounds.y]);
    if (key === ClickTypes.RIGHT)
      this.handleClicks(InputEventTypes.RIGHT_CLICK, [event.x - canvasBounds.x, event.y - canvasBounds.y]);
  }

  mapKeyEvent(keycode: Key, dispatcher: DispatchEvent) {
    this.keyStateMap[keycode].registeredEvents.push(dispatcher);
  }

  frame(deltaTime: number) {
    this.raiseEvents();
    this.timeoutKey(deltaTime);
  }

  raiseEvents() {
    for (let key of Object.values(this.keys)) {
      if (!this.keyStateMap[key].pressed) continue;
      this.keyStateMap[key].registeredEvents.forEach(e => {
        this.eventBus.raise(e);
      })
    }
  }

  private isMappedKey(key: string) {
    return key in this.keyStateMap
  }

  private handleClicks(eventType: InputEventTypes, coordinate: Coordinate) {
    this.eventBus.raise(clickEvent(eventType, coordinate));
  }

  checkForSequence() {
    if (this.sequence.length > this.maxSequence) {
      this.sequence = this.sequence.slice(1);
    }
    for (let i = 0; i < this.sequence.length; i++) {
      const test = this.sequence.slice(i).reduce((seq, {key}) => seq += key, '');
      if (test in this.sequenceStateMap) {
        this.sequenceStateMap[test].registeredEvents.forEach(e => this.eventBus.raise(e));
        this.sequence = [];
      }
    }
  }

  addSequence(keys: Key[], dispatcher: DispatchEvent) {
    const aggregateKey = keys.reduce((str, k) => str += k, "");
    const state = this.sequenceStateMap[aggregateKey];
    if (Boolean(state)) {
      state.registeredEvents.push(dispatcher);
    } else {
      this.sequenceStateMap[aggregateKey] = {tapEvents: [], registeredEvents: [dispatcher], pressed: false}
    }
  }

  timeoutKey(deltaTime: number) {
    if (this.sequence.length > 0) {
      this.sequence.forEach(seq => seq.lifeTimeMS -= deltaTime);
      this.sequence = this.sequence.filter(seq => seq.lifeTimeMS > 0);
    }
  }
}
