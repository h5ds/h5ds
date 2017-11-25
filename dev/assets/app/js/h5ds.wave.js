/**
 * @desc 绘制水波纹
 */
export function drawWave(colorObj) {
    var canvas = document.getElementById('wave');
    var ctx = canvas.getContext('2d');
    //range控件信息
    var nowRange = 30; // 整体高度 0~100%
    //画布属性
    var mW = canvas.width = window.innerWidth;
    var mH = canvas.height = window.innerHeight;

    //画sin 曲线函数
    var drawSin = function (obj, color) {
        var points = obj.points || []; //用于存放绘制Sin曲线的点
        obj.xOffset += obj.speed;
        ctx.beginPath();

        //在整个轴长上取点
        var dY = mH * (1 - nowRange / 100);
        for (var i = 0; i < mW; i += 50) {
            //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
            var y = -Math.sin((i) * obj.waveWidth + obj.xOffset);
            points.push([i, dY + y * obj.waveHeight]);
            ctx.lineTo(i, dY + y * obj.waveHeight);
        }
        // 末尾加个
        ctx.lineTo(i, dY + (-Math.sin((i) * obj.waveWidth + obj.xOffset)) * obj.waveHeight);
        //封闭路径
        ctx.lineTo(mW, mH);
        ctx.lineTo(0, mH);
        ctx.lineTo(points[0][0], points[0][1]);
        ctx.fillStyle = color;
        ctx.fill();
    };

    // 没有 透明度的
    // if (colorObj.color.indexOf('rgba') === -1) {
    //     // ...
    //     colorObj.color = colorObj.color.replace('rgb(', 'rgba(');
    // } else {
    //     colorObj.color = colorObj.color.replace(/(rgba\(\d+,\d+,\d+),(((0|1)?\.)?\d+)\)/, '$1)');
    // }
    var lines = [
        {
            waveWidth: 0.006, //波浪宽度,数越小越宽 
            waveHeight: 40, //波浪高度,数越大越高
            speed: 0.02, //波浪速度，数越大速度越快
            xOffset: 100, //波浪x偏移量
            points: null
        },
        {
            waveWidth: 0.006, //波浪宽度,数越小越宽 
            waveHeight: 26, //波浪高度,数越大越高
            speed: 0.04, //波浪速度，数越大速度越快
            xOffset: 0, //波浪x偏移量
            points: null
        }
    ];
    var render = function () {
        ctx.clearRect(0, 0, mW, mH);
        for (let i = 0; i < lines.length; i++) {
            let str = (i === 0 ? ', 0.6)' : ', 0.3)');
            colorObj.color = colorObj.color.replace('rgb(', 'rgba(');
            drawSin(lines[i], colorObj.color.replace(')', str));
        }
        requestAnimationFrame(render);
    }

    window.addEventListener("resize", function () {
        mW = canvas.width = window.innerWidth;
        mH = canvas.height = window.innerHeight;
    });

    render();
}