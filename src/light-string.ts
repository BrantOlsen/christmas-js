/// <reference path="./light.ts" />

enum LightLocation {
  Top,
  Left,
  Right,
  Bottom
}

class LightString {
  lights: Light[];
  posTop: number = 0;
  posLeft: number = 0;
  posBottom: number = 0;
  posRight: number;
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
    this.lights.push(new Light(this._canvas.getContext('2d'), {x: 100, y: 0}, true));
    this.lights.push(new Light(this._canvas.getContext('2d'), {x: 200, y: 10}));
    this.lights.push(new Light(this._canvas.getContext('2d'), {x: 300, y: 10}));
  }
}