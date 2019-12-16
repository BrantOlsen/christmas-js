class Snowflake {
  x: number = 0;
  y: number = 0;
  canvas: HTMLDivElement;

  constructor() {
    this.canvas = document.createElement("div");
    document.body.appendChild(this.canvas);
    this.canvas.setAttribute('width', '100px');
    this.canvas.setAttribute('height', '100px');
    this.canvas.setAttribute('style', 'background-color: blue; width: 100px; height: 100px; position: fixed; top: 0; left: 0;');
    
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
    
    this.canvas.style.left = this.x + "px";
    this.canvas.style.top = this.y + "px";
  }
}

let t = new Snowflake();
setInterval(() => {
  t.draw();
}, 100);
