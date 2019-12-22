class LightPoint {
  x: number;
  y: number;
}

enum LightDrawStyle {
  Stroke,
  Fill
} 

class Light {
  height: number = 25;
  width: number = 10;
  color: string;
  center: LightPoint;
  drawStyle: LightDrawStyle = LightDrawStyle.Fill;
  private _context: CanvasRenderingContext2D;
  private _debug: boolean;

  constructor(ctx: CanvasRenderingContext2D, center: LightPoint, color: string, debug: boolean = false) {
    this.color = color;
    this.center = center;
    this._context = ctx;
    this._debug = debug;
    this.drawLight(); 
  }

  drawLight() {
    let endpoint = {x: this.center.x, y: 0};
    let region = new Path2D();

    // Right Side
    let rstart = {x: this.center.x + (this.width / 2), y: this.height};
    let rcp1 = {x: this.center.x + this.width - 5, y: this.height / 3};
    let rcp2 = {x: this.center.x + this.width, y: this.height / 2};
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

    if (this.drawStyle == LightDrawStyle.Fill) {
      this._context.shadowBlur = 10;
      this._context.shadowColor = this.color;
      this._context.fillStyle = this.color;
      this._context.fill(region);
    }
    else {
      this._context.strokeStyle = this.color;
      this._context.stroke(region);
    }

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