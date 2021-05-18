import {DispatchEvent, Key, KeyState} from '@game/index';

export class InputHandler {
  static _instance: InputHandler;

  static getInstance(): InputHandler {
    if (!InputHandler._instance) InputHandler._instance = new InputHandler();
    return InputHandler._instance;
  }

  keys = Key;
  keyStateMap: { [key: string]: KeyState }

  private constructor() {
    this.keyStateMap = {};
    this.setupEventListener();
    this.setupMap();
  }

  mapKeyEvent(keycode: Key, dispatcher: DispatchEvent) {
  }

  raiseEvents() {
    for (let key of Object.values(this.keys)) {

    }
  }

  private setupEventListener() {
    window.addEventListener('keydown', (event) => {
      if (this.isMappedKey(event.code))
        this.keyStateMap[event.code].pressed = true;
    });

    window.addEventListener('keyup', (event) => {
      if (this.isMappedKey(event.code))
        this.keyStateMap[event.code].pressed = false;
    })
  }

  private isMappedKey(key: string) {
    return key in this.keyStateMap
  }

  private setupMap() {
    for (let key of Object.values(this.keys)) {
      this.keyStateMap[key] = {pressed: false, registeredEvents: []}
    }
  }


}
