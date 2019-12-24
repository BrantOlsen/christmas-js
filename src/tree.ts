class Tree {
  branchHeight: number = 300;
  branchWidth: number = 200;
  baseWidth: number = 50;
  baseHeight: number = 50;
  posTop: number = 250;
  posLeft: number = 250;
  private _canvas: HTMLCanvasElement;

  constructor() {
    this._canvas = document.createElement("canvas");
    document.body.appendChild(this._canvas);
    this._canvas.setAttribute('width', this.branchWidth + 'px');
    this._canvas.setAttribute('height', (this.baseHeight + this.branchHeight) + 'px');
    this._canvas.setAttribute('style', `width: ${this.branchWidth}px; height: ${(this.baseHeight + this.branchHeight)}px; position: fixed; top: ${this.posTop}px; left: ${this.posLeft}px;`);
    let ctx = this._canvas.getContext('2d');

    // Base
    ctx.fillStyle = "brown";
    ctx.fillRect(this.branchWidth/2 - this.baseWidth/2, this.branchHeight, this.baseWidth, this.baseHeight);

    // Green Tree Part
    let greenPart = new Path2D();
    greenPart.moveTo(0, this.branchHeight);
    greenPart.lineTo(this.branchWidth, this.branchHeight);
    let branchCount = 6;
    let branchY = this.branchHeight;
    let branchX = this.branchWidth;
    for (let i = 0; i < branchCount; ++i) {
      branchY -= this.branchHeight / branchCount;
      branchX -= branchX * .20;
      greenPart.lineTo(branchX, branchY);
      branchX += (branchX - (this.branchWidth / 2)) * .50;
      greenPart.lineTo(branchX, branchY);
    }
    greenPart.lineTo(this.branchWidth / 2, 0);
    branchY = 0;
    branchX = this.branchWidth / 2;
    for (let i = 0; i < branchCount; ++i) {
      branchY += this.branchHeight / branchCount;
      branchX -= branchX * .20;
      greenPart.lineTo(branchX, branchY);
      branchX -= (branchX - (this.branchWidth / 2)) * .50;
      greenPart.lineTo(branchX, branchY);
    }
    greenPart.lineTo(0, this.branchHeight);
    ctx.fillStyle = 'green';
    ctx.fill(greenPart);

    //Ornament
    
    /*ctx.beginPath();
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
    ctx.closePath();*/

  }
}