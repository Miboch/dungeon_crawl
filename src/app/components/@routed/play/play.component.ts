import {Component, OnInit, Renderer2} from '@angular/core';
import {AssetLoader, Orchestrator, Renderer} from '@game/index';
import {Dimension} from '../../../model';

@Component({
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {
  canvas!: HTMLCanvasElement;
  private assets!: AssetLoader;

  constructor(private render: Renderer2) {
    this.assets = AssetLoader.getInstance();
  }

  ngOnInit(): void {
    Orchestrator.getInstance().bootstrapGame();
  }

  canvasResized({width, height}: Dimension) {
    this.render.setAttribute(this.canvas, 'width', String(width));
    this.render.setAttribute(this.canvas, 'height', String(height));
    Renderer.getInstance().setDimension(width, height);
  }

  registerCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    Renderer.getInstance().setCanvas(canvas);
  }

}
