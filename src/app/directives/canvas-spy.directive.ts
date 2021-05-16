import {AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({selector: '[canvasSpy]'})
export class CanvasSpyDirective implements AfterViewInit {
  @Output() resized: EventEmitter<DOMRect>
  @Output() canvasReady: EventEmitter<HTMLCanvasElement>

  @HostListener('window:resize')
  windowResized() {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.resized.emit(rect);
  }

  constructor(private canvas: ElementRef<HTMLCanvasElement>) {
    this.resized = new EventEmitter<DOMRect>();
    this.canvasReady = new EventEmitter<HTMLCanvasElement>();
  }

  ngAfterViewInit() {
    let interval: number;
    new Promise((res, rej) => {
      interval = setInterval(() => {
        if (this.canvas.nativeElement)
          res(undefined);
      });
    }).then(_ => {
      clearInterval(interval);
      this.canvasReady.emit(this.canvas.nativeElement);
      this.windowResized();
    });
  }
}
