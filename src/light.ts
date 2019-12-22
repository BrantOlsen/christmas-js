class LightPoint {
  x: number;
  y: number;
}

class Light {
  height: number = 25;
  width: number = 10;
  center: LightPoint;
  private _context: CanvasRenderingContext2D;
  private _debug: boolean;

  constructor(ctx: CanvasRenderingContext2D, center: LightPoint, debug: boolean = false) {
    this._context = ctx;
    this.center = center;
    this._debug = debug;
    this.drawLight(); 
  }

  private drawLight() {
    let endpoint = {x: this.center.x, y: 0};
    let region = new Path2D();

    // Right Side
    let rstart = {x: this.center.x + (this.width / 2), y: this.height};
    let rcp1 = {x: this.center.x + this.width - 5, y: this.height / 3};
    let rcp2 = {x: this.center.x + this.width, y: this.height / 2};
    if (this._debug) {
    }
    region.moveTo(rstart.x, rstart.y);
    region.bezierCurveTo(rcp1.x, rcp1.y, rcp2.x, rcp2.y, endpoint.x, endpoint.y);

    // Left Side
    let lstart = {x: this.center.x - this.width, y: this.height};
    let lcp1 = {x: this.center.x - this.width - 5, y: rcp2.y};
    let lcp2 = {x: this.center.x - this.width, y: rcp1.y};
    
    region.bezierCurveTo(lcp2.x, lcp2.y, lcp1.x, lcp1.y, lstart.x, lstart.y);

    // Bottom Line
    region.lineTo(rstart.x, rstart.y);
    region.closePath();

    this._context.fillStyle = 'green';
    this._context.fill(region);

    if (this._debug) {
      this.drawControlPoint(lstart, 'yellow');
      this.drawControlPoint(lcp1, 'orange');
      this.drawControlPoint(lcp2, 'orange');
      this.drawControlPoint(rstart, 'blue');
      this.drawControlPoint(rcp1, 'red');
      this.drawControlPoint(rcp2, 'red');
    }
  }

  private drawControlPoint(point: LightPoint, color: string = 'blue') {
    // Start and end points
    this._context.fillStyle = color;
    this._context.beginPath();
    this._context.arc(point.x, point.y, 3, 0, 2 * Math.PI);
    this._context.fill();
    console.log(`Point: ${point.x}, ${point.y}`);
  }
}