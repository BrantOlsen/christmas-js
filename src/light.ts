class Light {
  height: number = 25;
  width: number = 20;
  posTop: number = 100;
  posLeft: number = 100;
  private _canvas: HTMLCanvasElement;

  constructor() {
    this._canvas = document.createElement("canvas");
    document.body.appendChild(this._canvas);
    this._canvas.setAttribute('width', this.height + 'px');
    this._canvas.setAttribute('height', this.height + 'px');
    this._canvas.setAttribute('style', `width: ${this.height}px; height: ${this.height}px; position: fixed; top: ${this.posTop}px; left: ${this.posLeft}px;`);
    let ctx = this._canvas.getContext('2d');
    let endpoint = {x: this.width / 2, y: 0};

    // Right Side
    let controlPoint1 = {x: 0, y: this.height / 2};
    let controlPoint2 = {x: this.height, y: this.height / 2};
    ctx.beginPath();
    ctx.moveTo(this.height - this.width, this.height - 1);
    ctx.bezierCurveTo(controlPoint1.x, controlPoint1.y, controlPoint2.x, controlPoint2.y, endpoint.x, endpoint.y);
    ctx.strokeStyle = "green";
    ctx.stroke();
    // Left Side
    let lstart = {x: this.width, y: this.height - 1};
    let lcp1 = {x: 0, y: this.height / 2};
    let lcp2 = {x: this.height, y: this.height / 2};
    ctx.beginPath();
    ctx.moveTo(lstart.x, lstart.y);
    ctx.bezierCurveTo(lcp1.x, lcp1.y, lcp2.x, lcp2.y, endpoint.x, endpoint.y);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    // Bottom Line
    ctx.beginPath();
    ctx.moveTo(lstart.x, lstart.y);
    ctx.lineTo(this.height - this.width, this.height - 1);
    ctx.strokeStyle = "orange";
    ctx.stroke();
  }
}