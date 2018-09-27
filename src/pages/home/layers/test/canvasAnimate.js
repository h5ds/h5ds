/**
 * @desc 闪电动画效果
 */
export class LightAnimate {
    static w = null;
    static h = null;
    constructor(target, layer) {
        const canvas = $(target).find('canvas')[0];
        const { width, height } = layer.style;
        this.ctx = canvas.getContext('2d'); //
        this.opts = {
            rays: 20,
            maxRadius: Math.sqrt((width * width) / 4 + (height * height) / 4),
            circleRadiusIncrementAcceleration: 2,
            radiantSpan: 0.4,
            rayAngularVelSpan: 0.005,
            rayAngularVelLineWidthMultiplier: 60,
            rayAngularAccWaveInputBaseIncrementer: 0.03,
            rayAngularAccWaveInputAddedIncrementer: 0.02,
            rayAngularAccWaveMultiplier: 0.0003,
            baseWaveInputIncrementer: 0.01,
            addedWaveInputIncrementer: 0.01,
            circleNumWaveIncrementerMultiplier: 0.1,
            cx: width / 2,
            cy: height / 2,
            tickHueMultiplier: 1,
            shadowBlur: 0,
            repaintAlpha: 0.2
        };
        this.tickHueMultiplied = null;
        this.tick = 0;
        this.rays = [];
    }

    resize = size => {
        const { width, height } = size;
        console.log('width, height', width, height);
        this.constructor.w = width;
        this.constructor.h = height;
        this.opts.maxRadius = Math.sqrt((width * width) / 4 + (height * height) / 4);
        this.opts.cx = width / 2;
        this.opts.cy = height / 2;
        this.init();
    };

    init = () => {
        let { opts, loop, ctx } = this;
        this.rays.length = 0;
        for (let i = 0; i < opts.rays; ++i) {
            this.rays.push(new Ray(opts, ctx, this.tickHueMultiplied));
        }
        if (this.tick === 0) {
            loop();
        }
    };

    loop = () => {
        const { ctx, opts } = this;
        requestAnimationFrame(this.loop);
        ++this.tick;
        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowBlur = 0;
        // ctx.fillStyle = 'rgba(0,0,0,alp)'.replace('alp', opts.repaintAlpha);
        // ctx.fillRect(0, 0, this.constructor.w, this.constructor.h);
        ctx.clearRect(0, 0, this.constructor.w, this.constructor.h);

        ctx.shadowBlur = opts.shadowBlur;
        ctx.globalCompositeOperation = 'lighter';
        this.tickHueMultiplied = opts.tickHueMultiplier * this.tick;
        this.rays.map(function(ray) {
            ray.step();
        });
    };
}

class Ray {
    constructor(opts, ctx, tickHueMultiplied) {
        this.tickHueMultiplied = tickHueMultiplied;
        this.ctx = ctx;
        this.opts = opts;
        this.circles = [new Circle(0, opts)];
        this.rot = Math.random() * Math.PI * 2;
        this.angularVel = Math.random() * opts.rayAngularVelSpan * (Math.random() < 0.5 ? 1 : -1);
        this.angularAccWaveInput = Math.random() * Math.PI * 2;
        this.angularAccWaveInputIncrementer =
            opts.rayAngularAccWaveInputBaseIncrementer + opts.rayAngularAccWaveInputAddedIncrementer * Math.random();

        var security = 100,
            count = 0;

        while (--security > 0 && this.circles[count].radius < opts.maxRadius)
            this.circles.push(new Circle(++count, opts));
    }

    step = () => {
        const { opts, ctx } = this;
        this.rot += this.angularVel +=
            Math.sin((this.angularAccWaveInput += this.angularAccWaveInputIncrementer)) *
            opts.rayAngularAccWaveMultiplier;

        var rot = this.rot,
            x = opts.cx,
            y = opts.cy;

        ctx.lineWidth =
            Math.min(0.00001 / Math.abs(this.angularVel), 10 / opts.rayAngularVelLineWidthMultiplier) *
            opts.rayAngularVelLineWidthMultiplier;

        ctx.beginPath();
        ctx.moveTo(x, y);

        for (var i = 0; i < this.circles.length; ++i) {
            var circle = this.circles[i];
            circle.step();
            rot += circle.radiant;
            var x2 = opts.cx + Math.sin(rot) * circle.radius,
                y2 = opts.cy + Math.cos(rot) * circle.radius,
                mx = (x + x2) / 2,
                my = (y + y2) / 2;

            ctx.quadraticCurveTo(x, y, mx, my);
            x = x2;
            y = y2;
        }

        ctx.strokeStyle = ctx.shadowColor = 'hsl(hue,80%,50%)'.replace(
            'hue',
            ((((rot + this.rot) / 2) % (Math.PI * 2)) / Math.PI) * 30 + this.tickHueMultiplied
        );

        ctx.stroke();
    };
}

class Circle {
    constructor(n, opts) {
        this.opts = opts;
        this.radius = opts.circleRadiusIncrementAcceleration * Math.pow(n, 2);
        this.waveInputIncrementer =
            (opts.baseWaveInputIncrementer + opts.addedWaveInputIncrementer * Math.random()) *
            (Math.random() < 0.5 ? 1 : -1) *
            opts.circleNumWaveIncrementerMultiplier *
            n;
        this.waveInput = Math.random() * Math.PI * 2;
        this.radiant = Math.random() * opts.radiantSpan * (Math.random() < 0.5 ? 1 : -1);
    }

    step = () => {
        this.waveInput += this.waveInputIncrementer;
        this.radiant = Math.sin(this.waveInput) * this.opts.radiantSpan;
    };
}

// window.addEventListener( 'resize', function(){

// 	w = c.width = window.innerWidth;
// 	h = c.height = window.innerHeight;

// 	opts.maxRadius = Math.sqrt( w*w/4 + h*h/4 );
// 	opts.cx = w / 2;
// 	opts.cy = h / 2;

// 	init();
// });
// c.addEventListener( 'click', function(e){

// 	opts.cx = e.clientX;
// 	opts.cy = e.clientY;

// })
