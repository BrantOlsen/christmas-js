/// <reference path="./light.ts" />

enum LightLocation {
  Top,
  Left,
  Right,
  Bottom
}

class LightString {
  lights: Light[];
  posTop: number;
  posLeft: number = 0;
  posBottom: number = 0;
  posRight: number;
  private _canvas: HTMLCanvasElement;

  constructor(location: LightLocation) {
    this._canvas = document.createElement("canvas");
    document.body.appendChild(this._canvas);
    let isHorizontal = location == LightLocation.Bottom || location == LightLocation.Top;
    let width = isHorizontal ? '100%' : '25px';
    let height = isHorizontal ? '25px' : `${window.innerHeight}px`;
    this._canvas.setAttribute('width',  width);
    this._canvas.setAttribute('height', height);
    this._canvas.setAttribute('style', `width: ${width}; height: ${height}; position: fixed; top: ${this.posTop}px; left: ${this.posLeft}px;`);

    this.lights = [];
    this.lights.push(new Light());
  }
}