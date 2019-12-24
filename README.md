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