/// <reference path="./snowflake.ts" />
/// <reference path="./light.ts" />

class Storm {
  snowflakes: Snowflake[] = [];
  flakesAtATime: number = 10;
  flakeMinSize = 15;
  flakeMaxSize = 20;
  flakeMinPoints = 5;
  flakeMaxPoints = 6;
  flakeSpeed = 2;
  flakeDrift = 5;
  createSnowInterval: number;

  constructor() {
    setInterval(() => {
      this.snowflakes.forEach(flake => {
        flake.speed = this.flakeSpeed; 
        flake.drift = this.flakeDrift;
        flake.draw();
      });
    }, 50); // 20 FPS
  }

  startSnow() {
    this.createSnowInterval = setInterval(() => {
      let distanceBetweenFlakes = window.innerWidth / this.flakesAtATime;
      let i = distanceBetweenFlakes;
      while (i < window.innerWidth) {
        let flakePoints = Math.floor((this.flakeMaxPoints - this.flakeMinPoints + 1) * Math.random() + this.flakeMinPoints);
        let flakeSize = Math.floor((this.flakeMaxSize - this.flakeMinSize + 1) * Math.random() + this.flakeMinSize);
        let flake = new Snowflake(0, i, flakePoints, flakeSize);
        this.snowflakes.push(flake);
        
        i += distanceBetweenFlakes;
      }

      // Stop after creating enough snow for the whole window.
      if (this.snowflakes.length > ((this.flakesAtATime + 1) * (window.innerHeight / this.snowflakes[0].size))) {
        clearInterval(this.createSnowInterval);
      }
    }, 1000);
  }
}

let t = new Storm();
t.startSnow();

var l = new Light();