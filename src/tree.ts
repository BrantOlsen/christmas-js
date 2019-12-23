class Tree {
  height: number = 300;
  width: number = 50;
  posTop: number = 250;
  posLeft: number = 250;
  private _canvas: HTMLCanvasElement;

  constructor() {
    this._canvas = document.createElement("canvas");
    document.body.appendChild(this._canvas);
    this._canvas.setAttribute('width', this.height + 'px');
    this._canvas.setAttribute('height', this.height + 'px');
    this._canvas.setAttribute('style', `width: ${this.height}px; height: ${this.height}px; position: fixed; top: ${this.posTop}px; left: ${this.posLeft}px;`);
    let ctx = this._canvas.getContext('2d');

    // Base
    let baseHeight = this.width;
    ctx.fillStyle = "brown";
    ctx.fillRect(this.height/2 - this.width/2, this.height - this.width, this.width, this.width);

    // Green Tree Part
    let greenPart = new Path2D();
    greenPart.moveTo(0, this.height - baseHeight);
    greenPart.lineTo(this.height, this.height - baseHeight);
    greenPart.lineTo(this.height / 2, 0);
    greenPart.lineTo(0, this.height - baseHeight);
    ctx.fillStyle = 'green';
    ctx.fill(greenPart);

    //Ornament
    
    ctx.beginPath();
    let orgnamizeHeight = 15;
    ctx.arc(this.width, this.height - this.width - orgnamizeHeight, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
    ctx.arc(this.width, this.height - this.width - orgnamizeHeight*2, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
    ctx.arc(this.width, this.height - this.width - orgnamizeHeight*3, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();

  }
}