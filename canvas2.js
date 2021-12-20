var Canvas2 = document.getElementById('canvas2');
var ctx2 = Canvas2.getContext('2d');

var resize = function() {
    Canvas2.width = Canvas2.clientWidth;
    Canvas2.height = Canvas2.clientHeight;
};
window.addEventListener('resize', resize);
resize();

var elements2 = [];
var presets2 = {};

presets2.o = function (x, y, s, dx, dy) {
    return {
        x: x,
        y: y,
        r: 12 * s,
        w: 5 * s,
        dx: dx,
        dy: dy,
        draw: function(ctx2, t) {
            this.x += this.dx;
            this.y += this.dy;
            
            ctx2.beginPath();
            ctx2.arc(this.x + + Math.sin((50 + x + (t / 10)) / 100) * 3, this.y + + Math.sin((45 + x + (t / 10)) / 100) * 4, this.r, 0, 2 * Math.PI, false);
            ctx2.lineWidth = this.w;
            ctx2.strokeStyle = '#fff';
            ctx2.stroke();
        }
    }
};

presets2.x = function (x, y, s, dx, dy, dr, r) {
    r = r || 0;
    return {
        x: x,
        y: y,
        s: 20 * s,
        w: 5 * s,
        r: r,
        dx: dx,
        dy: dy,
        dr: dr,
        draw: function(ctx2, t) {
            this.x += this.dx;
            this.y += this.dy;
            this.r += this.dr;
            
            var _this = this;
            var line = function(x, y, tx, ty, c, o) {
                o = o || 0;
                ctx2.beginPath();
                ctx2.moveTo(-o + ((_this.s / 2) * x), o + ((_this.s / 2) * y));
                ctx2.lineTo(-o + ((_this.s / 2) * tx), o + ((_this.s / 2) * ty));
                ctx2.lineWidth = _this.w;
                ctx2.strokeStyle = c;
                ctx2.stroke();
            };
            
            ctx2.save();
            
            ctx2.translate(this.x + Math.sin((x + (t / 10)) / 100) * 5, this.y + Math.sin((10 + x + (t / 10)) / 100) * 2);
            ctx2.rotate(this.r * Math.PI / 180);
            
            line(-1, -1, 1, 1, '#fff');
            line(1, -1, -1, 1, '#fff');
            
            ctx2.restore();
        }
    }
};

for(var x = 0; x < Canvas2.width; x++) {
    for(var y = 0; y < Canvas2.height; y++) {
        if(Math.round(Math.random() * 8000) == 1) {
            var s = ((Math.random() * 5) + 1) / 10;
            if(Math.round(Math.random()) == 1)
                elements2.push(presets2.o(x, y, s, 0, 0));
            else
                elements2.push(presets2.x(x, y, s, 0, 0, ((Math.random() * 3) - 1) / 10, (Math.random() * 360)));
        }
    }
}

setInterval(function() {
    ctx2.clearRect(0, 0, Canvas2.width, Canvas2.height);

    var time = new Date().getTime();
    for (var e in elements2)
		elements2[e].draw(ctx2, time);
}, 10);


