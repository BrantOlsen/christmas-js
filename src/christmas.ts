/// <reference path="./snow-storm.ts" />
/// <reference path="./light-string.ts" />

let t = new SnowStorm();
t.startSnow();

var lights = [
  new LightString(LightLocation.Bottom),
  new LightString(LightLocation.Top),
  new LightString(LightLocation.Right),
  new LightString(LightLocation.Left)
];