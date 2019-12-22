/// <reference path="./light.ts" />

enum LightLocation {
  Top,
  Left,
  Right,
  Bottom
}

class LightString {
  distanceBetweenLights: number = 100;
  lights: Light[];
  posTop: number = 0;
  posLeft: number = 0;
  posBottom: number = 0;
  posRight: number;
  colors: string[] = ['green', 'red', 'blue'];
  private _drawCount: number = 0;
  private _canvas: HTMLCanvasElement;

  constructor(location: LightLocation) {
    this._canvas = document.createElement("canvas");
    document.body.appendChild(this._canvas);
    let isHorizontal = location == LightLocation.Bottom || location == LightLocation.Top;
    let width = isHorizontal ? `${window.innerWidth}px` : '25px';
    let height = isHorizontal ? '50px' : `${window.innerHeight}px`;
    this._canvas.setAttribute('width',  width);
    this._canvas.setAttribute('height', height);
    this._canvas.setAttribute('style', `width: ${width}; height: ${height}; position: fixed; bottom: ${this.posBottom}px; left: ${this.posLeft}px;`);

    this.lights = [];

    let lightPos = this.distanceBetweenLights;
    while (lightPos < window.innerWidth - this.distanceBetweenLights) {
      this.lights.push(new Light(this._canvas.getContext('2d'), {x: lightPos, y: 50 / 2}, this.colors[this.lights.length % 3]));
      lightPos += this.distanceBetweenLights;
    } 
    window.setInterval(() => {
      this.drawLights();
    }, 1000);
  }

  drawLights() {
    this._canvas.getContext('2d').clearRect(0, 0, this._canvas.width, this._canvas.height);
    this.lights.forEach((l, index) => {
      l.drawStyle = (this._drawCount + index) % 2 == 0 ? LightDrawStyle.Stroke : LightDrawStyle.Fill;
      l.drawLight();
    });
    ++this._drawCount;
  }
}