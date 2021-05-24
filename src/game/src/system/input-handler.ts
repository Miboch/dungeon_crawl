import {clickEvent, ClickTypes, Coordinate, DispatchEvent, EventBus, InputEventTypes, Key, KeyState} from '@game/index';
import {SequenceKey} from '@game/src/model/sequence-key';

export class InputHandler {
  static _instance: InputHandler;

  static getInstance(): InputHandler {
    if (!InputHandler._instance) InputHandler._instance = new InputHandler();
    return InputHandler._instance;
  }

  private readonly keyStateMap: { [key: string]: KeyState }
  private readonly sequenceStateMap: { [key: string]: KeyState }
  private readonly maxSequence = 10;
  private readonly sequenceKeyLifetime = 1500 / 1000;
  private readonly canvasRef: HTMLCanvasElement;

  private keys = Key;
  private sequence: SequenceKey[];
  private eventBus = EventBus.getInstance();
  private mousePosition: Coordinate;
  private mouseOnCanvas = false;

  private constructor() {
    this.sequence = [];
    this.keyStateMap = {};
    this.sequenceStateMap = {};
    this.mousePosition = [0, 0];
    this.canvasRef = document.querySelector('canvas') as HTMLCanvasElement; // add an ID instead, in case of more canvas elements in future.
    this.setupEventListener();
    this.setupMap();
  }

  addKey(key: Key, dispatcher: DispatchEvent) {
    this.keyStateMap[key].registeredEvents.push(dispatcher);
  }

  addKeyToggle(key: Key, dispatcher: DispatchEvent) {
    this.keyStateMap[key].tapEvents.push(dispatcher);
  }

  addKeySequence(keys: Key[], dispatcher: DispatchEvent) {
    const aggregateKey = keys.reduce((str, k) => str += k, "");
    const state = this.sequenceStateMap[aggregateKey];
    if (Boolean(state)) {
      state.registeredEvents.push(dispatcher);
    } else {
      this.sequenceStateMap[aggregateKey] = {tapEvents: [], registeredEvents: [dispatcher], pressed: false}
    }
  }

  frame(deltaTime: number) {
    this.raiseEvents();
    this.timeoutKey(deltaTime);
  }

  private setupEventListener() {
    window.addEventListener('keydown', (e) => this.handleKeypress(e));
    window.addEventListener('keyup', (e) => this.handleKeypress(e, false));
    window.addEventListener('mousedown', (event) => this.handleMouseClickEvent(event));
    window.addEventListener('mousemove', (event) => this.handleMouseMove(event));
    window.addEventListener('contextmenu', (event) => {
      if (event.target === this.canvasRef) event.preventDefault();
    });

    this.canvasRef.addEventListener('mouseenter', () => this.mouseOnCanvas = true);
    this.canvasRef.addEventListener('mouseleave', () => this.mouseOnCanvas = false);

  }

  private setupMap() {
    for (let key of Object.values(this.keys)) {
      this.keyStateMap[key] = {pressed: false, registeredEvents: [], tapEvents: []}
    }
  }

  private handleKeypress(event: KeyboardEvent, down: boolean = true) {
    if (this.isMappedKey(event.code)) {
      if (down) {
        if (!this.keyStateMap[event.code].pressed) {
          this.keyStateMap[event.code].tapEvents.forEach(e => {
            e.data = {toggle: true};
            this.eventBus.raise(e);
          })
          this.keyStateMap[event.code].pressed = true;
        }
        this.sequence.push({key: event.code, lifeTimeMS: this.sequenceKeyLifetime});
        this.checkForSequence();
      } else {
        // handle fire-once pr. press
        this.keyStateMap[event.code].pressed = false;
        this.keyStateMap[event.code].tapEvents.forEach(e => {
          e.data = {toggle: false}
          this.eventBus.raise(e);
        });
      }
    }
  }

  private handleMouseClickEvent(event: MouseEvent) {
    if (event.target != this.canvasRef) return;
    event.preventDefault();
    const key = event.button as ClickTypes;
    if (key === ClickTypes.LEFT)
      this.handleClicks(InputEventTypes.LEFT_CLICK, [...this.mousePosition]);
    if (key === ClickTypes.RIGHT)
      this.handleClicks(InputEventTypes.RIGHT_CLICK, [...this.mousePosition]);
  }

  private handleMouseMove(event: MouseEvent) {
    if (this.mouseOnCanvas) {
      const canvasBounds = this.canvasRef.getBoundingClientRect();
      this.mousePosition[0] = event.x - canvasBounds.x;
      this.mousePosition[1] = event.y - canvasBounds.y;
    }

  }

  private raiseEvents() {
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

  private checkForSequence() {
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

  private timeoutKey(deltaTime: number) {
    if (this.sequence.length > 0) {
      this.sequence.forEach(seq => seq.lifeTimeMS -= deltaTime);
      this.sequence = this.sequence.filter(seq => seq.lifeTimeMS > 0);
    }
  }
}
