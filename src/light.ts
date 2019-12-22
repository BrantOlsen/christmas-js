class Light {
  height: number = 25;
  width: number = 10;
  posTop: number = 100;
  posLeft: number = 100;
  private _canvas: HTMLCanvasElement;

  constructor() {
    this._canvas = document.createElement("canvas");
    document.body.appendChild(this._canvas);
    this._canvas.setAttribute('width', this.height + 'px');
    this._canvas.setAttribute('height', this.height + 'px');
    this._canvas.setAttribute('style', `width: ${this.height}px; height: ${this.height}px; position: fixed; top: ${this.posTop}px; left: ${this.posLeft}px;`);
    this.drawLight(this._canvas.getContext('2d')); 
  }

  private drawLight(ctx: CanvasRenderingContext2D) {
    let endpoint = {x: this.height / 2, y: 0};
    let region = new Path2D();
    let offsetFromSides = (this.height - this.width) / 2;

    // Right Side
    let rstart = {x: this.height - offsetFromSides, y: this.height};
    let rcp1 = {x: this.height - 5, y: this.height / 3};
    let rcp2 = {x: this.height, y: this.height / 2};
    region.moveTo(rstart.x, rstart.y);
    region.bezierCurveTo(rcp1.x, rcp1.y, rcp2.x, rcp2.y, endpoint.x, endpoint.y);

    // Left Side
    let lstart = {x: offsetFromSides, y: this.height};
    let lcp1 = {x: 5, y: rcp2.y};
    let lcp2 = {x: 0, y: rcp1.y};
    region.bezierCurveTo(lcp2.x, lcp2.y, lcp1.x, lcp1.y, lstart.x, lstart.y);

    // Bottom Line
    region.lineTo(rstart.x, rstart.y);
    region.closePath();

    ctx.fillStyle = 'green';
    ctx.fill(region);
  }

  private drawControlPoint(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // Start and end points
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}