var Snowflake = /** @class */ (function () {
    function Snowflake(posTop, posLeft, points, size) {
        this.posTop = 0;
        this.posLeft = 0;
        this.size = 15;
        this.points = 5;
        this.speed = 10;
        this.drift = 2;
        this._steps = 0;
        this.posTop = posTop;
        this.posLeft = posLeft;
        this.points = points;
        this.size = size;
        this._canvas = document.createElement("canvas");
        document.body.appendChild(this._canvas);
        this._canvas.setAttribute('width', this.size + 'px');
        this._canvas.setAttribute('height', this.size + 'px');
        this._canvas.setAttribute('style', "width: " + this.size + "px; height: " + this.size + "px; position: fixed; top: " + this.posTop + "px; left: " + this.posLeft + "px;");
        var ctx = this._canvas.getContext('2d');
        var startX = this.size / 2 - 1;
        var startY = 0;
        var degrees = 0;
        while (degrees <= 360) {
            degrees += 360 / this.points;
            this.drawRotatedRect(ctx, startX, startY, 1, this.size, degrees);
        }
    }
    Snowflake.prototype.drawRotatedRect = function (ctx, x, y, width, height, degrees) {
        ctx.save();
        ctx.beginPath();
        // move the rotation point to the center of the rect
        ctx.translate(x + width / 2, y + height / 2);
        // rotate the rect
        ctx.rotate(degrees * Math.PI / 180);
        // draw the rect on the transformed context
        // Note: after transforming [0,0] is visually [x,y]
        //       so the rect needs to be offset accordingly when drawn
        ctx.fillStyle = "#d3d3d3";
        ctx.strokeRect(-width / 2, -height / 2, width, height);
        ctx.rect(-width / 2, -height / 2, width, height);
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'white';
        ctx.fillStyle = "white";
        ctx.fill();
        // restore the context to its untranslated/unrotated state
        ctx.restore();
    };
    Snowflake.prototype.draw = function () {
        this._steps += 1;
        this.posTop += this.speed;
        this.posLeft += this.drift * (Math.random() - Math.random());
        if (this.posLeft > window.innerWidth) {
            this.posLeft = 0;
        }
        if (this.posTop > window.innerHeight) {
            this.posTop = -this.speed;
        }
        this._canvas.style.left = this.posLeft + "px";
        this._canvas.style.top = this.posTop + "px";
    };
    return Snowflake;
}());
/// <reference path="./snowflake.ts" />
var SnowStorm = /** @class */ (function () {
    function SnowStorm() {
        var _this = this;
        this.snowflakes = [];
        this.flakesAtATime = 10;
        this.flakeMinSize = 10;
        this.flakeMaxSize = 15;
        this.flakeMinPoints = 5;
        this.flakeMaxPoints = 6;
        this.flakeSpeed = 2;
        this.flakeDrift = 5;
        setInterval(function () {
            if (document.hidden) {
                return;
            }
            _this.snowflakes.forEach(function (flake) {
                flake.speed = _this.flakeSpeed;
                flake.drift = _this.flakeDrift;
                flake.draw();
            });
        }, 50); // 20 FPS
    }
    SnowStorm.prototype.startSnow = function () {
        var _this = this;
        this.createSnowInterval = setInterval(function () {
            if (document.hidden) {
                return;
            }
            var distanceBetweenFlakes = window.innerWidth / _this.flakesAtATime;
            var i = distanceBetweenFlakes;
            while (i < window.innerWidth) {
                var flakePoints = Math.floor((_this.flakeMaxPoints - _this.flakeMinPoints + 1) * Math.random() + _this.flakeMinPoints);
                var flakeSize = Math.floor((_this.flakeMaxSize - _this.flakeMinSize + 1) * Math.random() + _this.flakeMinSize);
                var flake = new Snowflake(0, i, flakePoints, flakeSize);
                _this.snowflakes.push(flake);
                i += distanceBetweenFlakes;
            }
            // Stop after creating enough snow for the whole window.
            if (_this.snowflakes.length > ((_this.flakesAtATime + 1) * (window.innerHeight / _this.snowflakes[0].size))) {
                clearInterval(_this.createSnowInterval);
            }
        }, 1000);
    };
    return SnowStorm;
}());
var LightPoint = /** @class */ (function () {
    function LightPoint() {
    }
    return LightPoint;
}());
var LightDrawStyle;
(function (LightDrawStyle) {
    LightDrawStyle[LightDrawStyle["Stroke"] = 0] = "Stroke";
    LightDrawStyle[LightDrawStyle["Fill"] = 1] = "Fill";
})(LightDrawStyle || (LightDrawStyle = {}));
var LightLocation;
(function (LightLocation) {
    LightLocation[LightLocation["Top"] = 0] = "Top";
    LightLocation[LightLocation["Left"] = 1] = "Left";
    LightLocation[LightLocation["Right"] = 2] = "Right";
    LightLocation[LightLocation["Bottom"] = 3] = "Bottom";
})(LightLocation || (LightLocation = {}));
var Light = /** @class */ (function () {
    function Light(ctx, center, color, direction, debug) {
        if (debug === void 0) { debug = false; }
        this.height = 25;
        this.width = 10;
        this.drawStyle = LightDrawStyle.Fill;
        this.color = color;
        this.drawDirection = direction;
        this.center = center;
        this._context = ctx;
        this._debug = debug;
        this.drawLight();
    }
    Light.prototype.drawLight = function () {
        var endpoint = {
            x: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? this.center.x :
                this.drawDirection == LightLocation.Right ? this.center.x - this.height :
                    this.height,
            y: this.drawDirection == LightLocation.Top ? this.height :
                this.drawDirection == LightLocation.Bottom ? this.center.y - this.height :
                    this.center.y
        };
        var region = new Path2D();
        // Right Side
        var rstart = {
            x: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? this.center.x + (this.width / 2) :
                this.drawDirection == LightLocation.Right ? this.center.x :
                    0,
            y: this.drawDirection == LightLocation.Top ? 0 :
                this.drawDirection == LightLocation.Bottom ? this.center.y :
                    this.center.y - (this.width / 2)
        };
        var rcp1 = {
            x: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? this.center.x + this.width - 5 :
                this.drawDirection == LightLocation.Right ? endpoint.x + this.height / 3 :
                    endpoint.x - this.height / 3,
            y: this.drawDirection == LightLocation.Top ? rstart.y + this.height / 3 :
                rstart.y - this.height / 3
        };
        var rcp2 = {
            x: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? this.center.x + this.width :
                rcp1.x,
            y: rcp1.y
        };
        region.moveTo(rstart.x, rstart.y);
        region.bezierCurveTo(rcp1.x, rcp1.y, rcp2.x, rcp2.y, endpoint.x, endpoint.y);
        // Left Side
        var lstart = {
            x: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? this.center.x - (this.width / 2) :
                this.drawDirection == LightLocation.Right ? this.center.x :
                    0,
            y: this.drawDirection == LightLocation.Top ? 0 :
                this.drawDirection == LightLocation.Bottom ? this.center.y :
                    this.center.y + (this.width / 2)
        };
        var lcp1 = {
            x: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? lstart.x - 5 :
                rcp1.x,
            y: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? rcp2.y :
                lstart.y + 5
        };
        var lcp2 = {
            x: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? lstart.x - 10 :
                rcp2.x,
            y: this.drawDirection == LightLocation.Top || this.drawDirection == LightLocation.Bottom ? rcp1.y :
                lstart.y + 5
        };
        region.bezierCurveTo(lcp2.x, lcp2.y, lcp1.x, lcp1.y, lstart.x, lstart.y);
        // Bottom Line
        region.lineTo(rstart.x, rstart.y);
        region.closePath();
        if (this.drawStyle == LightDrawStyle.Fill) {
            this._context.shadowBlur = 20;
            this._context.shadowColor = this.color;
            this._context.fillStyle = this.color;
            this._context.fill(region);
        }
        else {
            this._context.strokeStyle = this.color;
            this._context.stroke(region);
        }
        if (this._debug) {
            this.drawControlPoint(lstart, 'yellow');
            this.drawControlPoint(lcp1, 'orange');
            this.drawControlPoint(lcp2, 'orange');
            this.drawControlPoint(rstart, 'blue');
            this.drawControlPoint(rcp1, 'red');
            this.drawControlPoint(rcp2, 'red');
        }
    };
    Light.prototype.drawControlPoint = function (point, color) {
        if (color === void 0) { color = 'blue'; }
        // Start and end points
        this._context.fillStyle = color;
        this._context.beginPath();
        this._context.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        this._context.fill();
        console.log("Point: " + point.x + ", " + point.y);
    };
    return Light;
}());
/// <reference path="./light.ts" />
var LightString = /** @class */ (function () {
    function LightString(location) {
        var _this = this;
        this.distanceBetweenLights = 100;
        this.posTop = 0;
        this.posLeft = 0;
        this.posBottom = 0;
        this.colors = ['green', 'red', 'blue', 'orange'];
        this._drawCount = 0;
        this._canvas = document.createElement("canvas");
        document.body.appendChild(this._canvas);
        var isHorizontal = location == LightLocation.Bottom || location == LightLocation.Top;
        var width = isHorizontal ? window.innerWidth + "px" : '50px';
        var height = isHorizontal ? '50px' : window.innerHeight + "px";
        this._canvas.setAttribute('width', width);
        this._canvas.setAttribute('height', height);
        var topBottom = location == LightLocation.Bottom ? 'bottom' : 'top';
        var rightLeft = location == LightLocation.Right ? 'right' : 'left';
        this._canvas.setAttribute('style', "width: " + width + "; height: " + height + "; position: fixed; " + topBottom + ": " + this.posBottom + "px; " + rightLeft + ": " + this.posLeft + "px;");
        this.lights = [];
        var lightPosOffset = this.distanceBetweenLights;
        while (lightPosOffset < window.innerWidth - this.distanceBetweenLights) {
            var lightPoint = {
                x: location == LightLocation.Bottom || location == LightLocation.Top ? lightPosOffset :
                    this._canvas.width,
                y: location == LightLocation.Bottom || location == LightLocation.Top ? this._canvas.height :
                    lightPosOffset
            };
            this.lights.push(new Light(this._canvas.getContext('2d'), lightPoint, this.colors[this.lights.length % 4], location));
            lightPosOffset += this.distanceBetweenLights;
        }
        window.setInterval(function () {
            if (!document.hidden) {
                _this.drawLights();
            }
        }, 1000);
    }
    LightString.prototype.drawLights = function () {
        var _this = this;
        this._canvas.getContext('2d').clearRect(0, 0, this._canvas.width, this._canvas.height);
        this.lights.forEach(function (l, index) {
            l.drawStyle = index % 3 == 0 && _this._drawCount % 2 == 0 ? LightDrawStyle.Stroke : LightDrawStyle.Fill;
            l.drawLight();
        });
        ++this._drawCount;
    };
    return LightString;
}());
var Tree = /** @class */ (function () {
    function Tree() {
        this.branchHeight = 300;
        this.branchWidth = 200;
        this.baseWidth = 50;
        this.baseHeight = 50;
        this.posTop = 250;
        this.posLeft = 250;
        this._canvas = document.createElement("canvas");
        document.body.appendChild(this._canvas);
        this._canvas.setAttribute('width', this.branchWidth + 'px');
        this._canvas.setAttribute('height', (this.baseHeight + this.branchHeight) + 'px');
        this._canvas.setAttribute('style', "width: " + this.branchWidth + "px; height: " + (this.baseHeight + this.branchHeight) + "px; position: fixed; top: " + this.posTop + "px; left: " + this.posLeft + "px;");
        var ctx = this._canvas.getContext('2d');
        // Base
        ctx.fillStyle = "brown";
        ctx.fillRect(this.branchWidth / 2 - this.baseWidth / 2, this.branchHeight, this.baseWidth, this.baseHeight);
        // Green Tree Part
        var greenPart = new Path2D();
        greenPart.moveTo(0, this.branchHeight);
        greenPart.lineTo(this.branchWidth, this.branchHeight);
        var branchCount = 6;
        var branchY = this.branchHeight;
        var branchX = this.branchWidth;
        for (var i = 0; i < branchCount; ++i) {
            branchY -= this.branchHeight / branchCount;
            branchX -= branchX * .20;
            greenPart.lineTo(branchX, branchY);
            branchX += (branchX - (this.branchWidth / 2)) * .50;
            greenPart.lineTo(branchX, branchY);
        }
        greenPart.lineTo(this.branchWidth / 2, 0);
        branchY = 0;
        branchX = this.branchWidth / 2;
        for (var i = 0; i < branchCount; ++i) {
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
    return Tree;
}());
/// <reference path="./snow-storm.ts" />
/// <reference path="./light-string.ts" />
/// <reference path="./tree.ts" />
var t = new SnowStorm();
t.startSnow();
var lights = [
    new LightString(LightLocation.Bottom),
    new LightString(LightLocation.Top),
    new LightString(LightLocation.Right),
    new LightString(LightLocation.Left)
];
var tree = new Tree();
//# sourceMappingURL=christmas.js.map