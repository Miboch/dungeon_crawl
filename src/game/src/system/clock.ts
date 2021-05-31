export class Clock {
  static _instance: Clock;

  static getInstance(): Clock {
    if (!Clock._instance) Clock._instance = new Clock();
    return Clock._instance;
  }

  private paused = false;

  // timing
  private updateRate = 60;
  private frameRate = 1000 / this.updateRate
  private deltaTime = 0;
  private timeBefore = 0;

  // observers
  private pauseableObservers: Array<{ call: (elapsedTime: number) => void }> = [];
  private continuousObserver: Array<{ call: (elapsedTime: number) => void }> = [];
  // We keep track of this to pass along accumulatedFrameTime to the game's tick event to avoid getting a huge
  // frame time difference when resuming after pausing the game.
  private accumulatedFrameTime = 0;

  private constructor() {
    window.requestAnimationFrame(this.tick.bind(this))
  }

  tick(elapsed: number) {
    const frameTime = elapsed - this.timeBefore;
    this.deltaTime += frameTime / this.frameRate;
    this.timeBefore = elapsed;
    this.accumulatedFrameTime += frameTime / 1000
    if (this.deltaTime > 1) {
      this.deltaTime -= Math.floor(this.deltaTime);
      this.nextFrame(Number(this.accumulatedFrameTime.toFixed(3)));
      this.accumulatedFrameTime = 0;
    }
    window.requestAnimationFrame(this.tick.bind(this))
  }

  nextFrame(elapsedTime: number) {
    // inactive tab hack
    if (elapsedTime >= 2) elapsedTime -= (elapsedTime - 1);

    // loop
    this.continuousObserver.forEach(co => co.call(elapsedTime))
    if (!this.paused) {
      this.pauseableObservers.forEach(po => po.call(elapsedTime))
    }
  }

  setPause(state: boolean) {
    this.paused = state;
  }

  addPausableObserver(call: (n: number) => void) {
    this.pauseableObservers.push({call})
  }

  addContinuousObserver(call: (n: number) => void) {
    this.continuousObserver.push({call})
  }

  invertPause() {
    this.paused = !this.paused;
  }

}
