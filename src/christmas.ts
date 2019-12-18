class Snowflake {
  x: number = 0;
  y: number = 0;
  width: number = 20;
  height: number = 20;
  points: number = 2;
  private _canvas: HTMLCanvasElement;

  constructor() {
    this._canvas = document.createElement("canvas");
    document.body.appendChild(this._canvas);
    this._canvas.setAttribute('width', '100px');
    this._canvas.setAttribute('height', '100px');
    this._canvas.setAttribute('style', 'background-color: black; width: 100px; height: 100px; position: fixed; top: 0; left: 0;');
    let ctx = this._canvas.getContext('2d');
    let degrees = 0;
    while (degrees <= 360) {
      degrees += 360 / this.points;
      // first save the untranslated/unrotated context
      ctx.save();
      ctx.beginPath();
      // move the rotation point to the center of the rect
      ctx.translate(this.width / 2, this.height / 2);
      // rotate the rect
      ctx.rotate(degrees * Math.PI / 180);

      // draw the rect on the transformed context
      // Note: after transforming [0,0] is visually [x,y]
      //       so the rect needs to be offset accordingly when drawn
      ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);

      ctx.fillStyle = "white";
      ctx.fill();

      // restore the context to its untranslated/unrotated state
      ctx.restore();
    }
  }

  draw(): void {
    this.x += 10;
    this.y += 10;
    if (this.x > window.innerWidth) {
      this.x = 0;
    }
    if (this.y > window.innerHeight) {
      this.y = 0;
    }
    
    this._canvas.style.left = this.x + "px";
    this._canvas.style.top = this.y + "px";
  }
}

let t = new Snowflake();
setInterval(() => {
  t.draw();
}, 500);
