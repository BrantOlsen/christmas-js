class Snowflake {
  x: number;
  y: number;
  canvas: Element;

  constructor() {
    this.canvas = document.createElement("div");
    this.canvas.setAttribute('width', '100px');
    this.canvas.setAttribute('height', '100px');
    this.canvas.setAttribute('style', 'background-color: blue;');
  }

  draw(): void {

  }
}

let t = new Snowflake();