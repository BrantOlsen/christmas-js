/// <reference path="./light.ts" />

class LightString {
  distanceBetweenLights: number = 100;
  lights: Light[];
  posTop: number = 0;
  posLeft: number = 0;
  posBottom: number = 0;
  posRight: number;
  colors: string[] = ['green', 'red', 'blue', 'orange'];
  private _drawCount: number = 0;
  private _canvas: HTMLCanvasElement;

  constructor(location: LightLocation) {
    this._canvas = document.createElement("canvas");
    document.body.appendChild(this._canvas);
    let isHorizontal = location == LightLocation.Bottom || location == LightLocation.Top;
    let width = isHorizontal ? `${window.innerWidth}px` : '50px';
    let height = isHorizontal ? '50px' : `${window.innerHeight}px`;
    this._canvas.setAttribute('width',  width);
    this._canvas.setAttribute('height', height);
    let topBottom = location == LightLocation.Bottom ? 'bottom' : 'top';
    let rightLeft = location == LightLocation.Right ? 'right' : 'left';
    this._canvas.setAttribute('style', `width: ${width}; height: ${height}; position: fixed; ${topBottom}: ${this.posBottom}px; ${rightLeft}: ${this.posLeft}px;`);

    this.lights = [];

    let lightPosOffset = this.distanceBetweenLights;
    while (lightPosOffset < window.innerWidth - this.distanceBetweenLights) {
      let lightPoint = {
        x: location == LightLocation.Bottom || location == LightLocation.Top ? lightPosOffset : 
          location == LightLocation.Left ? 0 : this._canvas.width,
        y: location == LightLocation.Bottom || location == LightLocation.Top ? this._canvas.height :
          lightPosOffset
      };
      this.lights.push(new Light(
        this._canvas.getContext('2d'),
        lightPoint,
        this.colors[this.lights.length % 4],
        location
      ));
      lightPosOffset += this.distanceBetweenLights;
    } 
    window.setInterval(() => {
      if (!document.hidden) {
        this.drawLights();
      }
    }, 1000);
  }

  drawLights() {
    this._canvas.getContext('2d').clearRect(0, 0, this._canvas.width, this._canvas.height);
    this.lights.forEach((l, index) => {
      l.drawStyle = index % 3 == 0 && this._drawCount % 2 == 0 ? LightDrawStyle.Stroke : LightDrawStyle.Fill;
      l.drawLight();
    });
    ++this._drawCount;
  }
}