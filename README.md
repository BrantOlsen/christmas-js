# christmas-js
Add snow and Christmas lights to your webpage.

# How to Use
```
<script src="dist/christmas.js"></script>
<script>
  let t = new SnowStorm();
  t.startSnow();

  var lights = [
    new LightString(LightLocation.Bottom),
    new LightString(LightLocation.Top),
    new LightString(LightLocation.Right),
    new LightString(LightLocation.Left)
  ];
</script>
```

# TODO
- Add wires between the lights of a light string and match up with the other LightStrings.
- Fix tree drawing.
- Add ornaments to the tree.
- Draw snow with lines instead of rectangles to allow for little perpendicular lines on the end of the big lines.
- Snow should drift more slowly.
- Add snowmen.
- Add presents.