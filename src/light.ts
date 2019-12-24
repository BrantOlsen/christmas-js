class LightPoint {
  x: number;
  y: number;
}

enum LightDrawStyle {
  Stroke,
  Fill
}

enum LightLocation {
  Top,
  Left,
  Right,
  Bottom
}

class Light {
  height: number = 25;
  width: number = 10;
  color: string;
  center: LightPoint;
  drawStyle: LightDrawStyle = LightDrawStyle.Fill;
  drawDirection: LightLocation;
  private _context: CanvasRenderingContext2D;
  private _debug: boolean;

  constructor(ctx: CanvasRenderingContext2D, center: LightPoint, color: string, direction: LightLocation, debug: boolean = false) {
    this.color = color;
    this.drawDirection = direction;
    this.center = center;
    this._context = ctx;
    this._debug = debug;
    this.drawLight(); 
  }

  drawLight() {
    let endpoint = {
      x: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? this.center.x :
         this.drawDirection == LightLocation.Right ? this.center.x - this.height :
         this.height,
      y: this.drawDirection == LightLocation.Top ? this.height :
         this.drawDirection == LightLocation.Bottom ? this.center.y - this.height :
         this.center.y
    };
    let region = new Path2D();

    // Right Side
    let rstart = {
      x: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? this.center.x + (this.width / 2) :
         this.drawDirection == LightLocation.Right ? this.center.x :
         0,
      y: this.drawDirection == LightLocation.Top ? 0 :
         this.drawDirection == LightLocation.Bottom ? this.center.y :
         this.center.y - (this.width / 2)
    };
    let rcp1 = {
      x: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? this.center.x + this.width - 5 :
         this.drawDirection == LightLocation.Right ? endpoint.x + this.height / 3 :
          endpoint.x - this.height / 3,
      y: this.drawDirection == LightLocation.Top ? rstart.y + this.height / 3 :
        rstart.y - this.height / 3
    };
    let rcp2 = {
      x: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? this.center.x + this.width :
         rcp1.x,
      y: rcp1.y
    };
    region.moveTo(rstart.x, rstart.y);
    region.bezierCurveTo(rcp1.x, rcp1.y, rcp2.x, rcp2.y, endpoint.x, endpoint.y);

    // Left Side
    let lstart = {
      x: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? this.center.x - (this.width / 2) :
         this.drawDirection == LightLocation.Right ? this.center.x :
          0,
      y: this.drawDirection == LightLocation.Top ? 0 :
         this.drawDirection == LightLocation.Bottom ? this.center.y :
          this.center.y + (this.width / 2)
    };
    let lcp1 = {
      x: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? lstart.x - 5 :
        rcp1.x,
      y: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? rcp2.y :
        lstart.y + 5
    };
    let lcp2 = {
      x: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? lstart.x - 10 :
        rcp2.x,
      y: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? rcp1.y :
        lstart.y + 5
    };
    
    region.bezierCurveTo(lcp2.x, lcp2.y, lcp1.x, lcp1.y, lstart.x, lstart.y);

    // Bottom Line
    region.lineTo(rstart.x, rstart.y);
    region.closePath();

    if (this.drawStyle == LightDrawStyle.Fill) {
      this._context.shadowBlur = 20;
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