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
    let rstart = {x: this.height - this.width, y: this.height - 1};
    let rcp1 = {x: 0, y: this.height / 3};
    let rcp2 = {x: rstart.x, y: this.height / 2};
    ctx.beginPath();
    ctx.moveTo(rstart.x, rstart.y);
    ctx.bezierCurveTo(rcp1.x, rcp1.y, rcp2.x, rcp2.y, endpoint.x, endpoint.y);
    ctx.strokeStyle = "green";
    ctx.stroke();
    // Left Side
    let lstart = {x: this.width, y: this.height - 1};
    let lcp1 = {x: lstart.x, y: rcp1.y};
    let lcp2 = {x: this.height, y: rcp2.y};
    ctx.beginPath();
    ctx.moveTo(lstart.x, lstart.y);
    ctx.bezierCurveTo(lcp2.x, lcp2.y, lcp1.x, lcp1.y, endpoint.x, endpoint.y);
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