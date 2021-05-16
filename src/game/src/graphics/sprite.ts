export class Sprite {
  imageData!: ImageBitmap;
  spriteReady = false;

  constructor(private src: string) {
    this.loadImageData(() => this.spriteReady = true);
  }

  getImageData() {
    return this.imageData;
  }

  loadImageData(readyCallback: () => void) {
    const img = new Image();
    img.onload = () => {
      createImageBitmap(img).then(data => {
        this.imageData = data;
        readyCallback();
      });
    }
    img.src = this.src;
  }

}
