class Snowflake {
  posTop: number = 0;
  posLeft: number = 0;
  size: number = 15;
  points: number = 5;
  speed: number = 10;
  drift: number = 2;
  
  private _canvas: HTMLCanvasElement;
  private _steps: number = 0;

  constructor(posTop: number, posLeft: number, points: number, size: number) {
    this.posTop = posTop;
    this.posLeft = posLeft;
    this.points = points;
    this.size = size;
    this._canvas = document.createElement("canvas");
    document.body.appendChild(this._canvas);
    this._canvas.setAttribute('width', this.size + 'px');
    this._canvas.setAttribute('height', this.size + 'px');
    this._canvas.setAttribute('style', `width: ${this.size}px; height: ${this.size}px; position: fixed; top: ${this.posTop}px; left: ${this.posLeft}px;`);
    let ctx = this._canvas.getContext('2d');

    var startX = this.size / 2 - 1;
    var startY = 0;

    let degrees = 0;
    while (degrees <= 360) {
      degrees += 360 / this.points
      this.drawRotatedRect(ctx, startX, startY, 1, this.size, degrees);
    }
  }

  private drawRotatedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, degrees: number) {
    ctx.save();

    ctx.beginPath();
    // move the rotation point to the center of the rect
    ctx.translate(x + width / 2, y + height / 2);
    // rotate the rect
    ctx.rotate(degrees * Math.PI / 180);

    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    ctx.fillStyle = "#d3d3d3";
    ctx.strokeRect(-width / 2, -height / 2, width, height);
    
    ctx.rect(-width / 2, -height / 2, width, height);
    ctx.shadowBlur = 5;
    ctx.shadowColor = 'white';
    ctx.fillStyle = "white";
    ctx.fill();

    // restore the context to its untranslated/unrotated state
    ctx.restore();
  }

  draw(): void {
    this._steps += 1;
    this.posTop += this.speed;
    this.posLeft += this.drift * (Math.random() - Math.random());
    if (this.posLeft > window.innerWidth) {
      this.posLeft = 0;
    }
    if (this.posTop > window.innerHeight) {
      this.posTop = -this.speed;
    }
    this._canvas.style.left = this.posLeft + "px";
    this._canvas.style.top = this.posTop + "px";
  }
}