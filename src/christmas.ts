/// <reference path="./snowflake.ts" />

class Storm {
  snowflakes: Snowflake[] = [];
  flakesAtATime: number = 10;
  createSnowInterval: number;

  constructor() {
    this.createSnowInterval = setInterval(() => {
      let distanceBetweenFlakes = window.innerWidth / this.flakesAtATime;
      let i = distanceBetweenFlakes;
      while (i < window.innerWidth) {
        this.snowflakes.push(new Snowflake(0, i));
        i += distanceBetweenFlakes;
      }

      // Stop after creating enough snow for the whole window.
      if (this.snowflakes.length > ((this.flakesAtATime + 1) * (window.innerHeight / this.snowflakes[0].size))) {
        clearInterval(this.createSnowInterval);
      }
    }, 1000);

    setInterval(() => {
      this.snowflakes.forEach(flake => {
        flake.draw();
      });
    }, 500);
  }
}

let t = new Storm();