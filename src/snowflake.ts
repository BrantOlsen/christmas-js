class Snowflake {
  posTop: number = 0;
  posLeft: number = 0;
  size: number = 25;
  points: number = 5;
  private _canvas: HTMLCanvasElement;

  constructor(posTop: number, posLeft: number) {
    this.posTop = posTop;
    this.posLeft = posLeft;
    this._canvas = document.createElement("canvas");
    document.body.appendChild(this._canvas);
    this._canvas.setAttribute('width', this.size + 'px');
    this._canvas.setAttribute('height', this.size + 'px');
    this._canvas.setAttribute('style', `background-color: black; width: ${this.size}px; height: ${this.size}px; position: fixed; top: ${this.posTop}px; left: ${this.posLeft}px;`);
    let ctx = this._canvas.getContext('2d');

    var startX = this.size / 2 - 1;
    var startY = 0;

    let degrees = 0;
    while (degrees <= 360) {
      degrees += 360 / this.points
      this.drawRotatedRect(ctx, startX, startY, 2, this.size, degrees);
    }
  }

  private drawRotatedRect(ctx, x, y, width, height, degrees) {
    ctx.save();

    ctx.beginPath();
    // move the rotation point to the center of the rect
    ctx.translate(x + width / 2, y + height / 2);
    // rotate the rect
    ctx.rotate(degrees * Math.PI / 180);

    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    //       so the rect needs to be offset accordingly when drawn
    ctx.rect(-width / 2, -height / 2, width, height);

    ctx.fillStyle = "white";
    ctx.fill();

    // restore the context to its untranslated/unrotated state
    ctx.restore();
  }

  draw(): void {
    this.posTop += 10;
    this.posLeft += 10;
    if (this.posLeft > window.innerWidth) {
      this.posLeft = 0;
    }
    if (this.posTop > window.innerHeight) {
      this.posTop = 0;
    }
    this._canvas.style.left = this.posLeft + "px";
    this._canvas.style.top = this.posTop + "px";
  }
}