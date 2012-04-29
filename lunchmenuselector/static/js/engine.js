// Original Source is from:
// http://www.switchonthecode.com/tutorials/creating-a-roulette-wheel-using-html5-canvas
// Modified by JAEYOON LEE (http://lunch.jaeyoon.org)
// Note that this tool is only for use of my lunch menu decision than anything else. :p

var startAngle = 0;
var arc = Math.PI / 6;
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

function drawRouletteWheel() {
    var canvas = document.getElementById("canvasDiv");

    if (canvas.getContext) {
        var outsideRadius = 200;
        var textRadius = 160;
        var insideRadius = 125;

        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 500, 500);
		ctx.lineWidth = 3;        
        
        ctx.font = fontTypeS;

		// Draw Roulette
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 3;

        for (var i = 0; i < 12; i++) {
            var angle = startAngle + i * arc;
            ctx.fillStyle = colors[i];

            ctx.beginPath();
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();

            ctx.save();
            ctx.shadowOffsetX = -1;
            ctx.shadowOffsetY = -1;
            ctx.shadowBlur = 0;
            ctx.shadowColor = "rgb(220,220,220)";
            
            // food item alignment
            ctx.fillStyle = "black";
            ctx.font = fontType;
            ctx.textAlign = "start";
            
            ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 250 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            var text = foods[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.fillText(misc, 240, 240);
            ctx.restore();
        }

        // Draw Arrow
        ctx.fillStyle = "white";
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
        ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 15));
        ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
        ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
        ctx.fill();
        
        addressMsg()
    }
}

function spinMsg() {
	ctx.beginPath();
	ctx.font = fontTypeS;
	ctx.strokeStyle = "grey";
	ctx.textAlign = "center";
	ctx.strokeText(spinMsgStr, 250, 265);
	ctx.closePath();
}

function spin() {
    spinAngleStart = Math.random() * 100 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
}

function rotateWheel() {
    spinTime += 20;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.strokeStyle = "grey";
    ctx.font = fontTypeS;
    ctx.textAlign = "center";
    var text = foods[index]
    ctx.strokeText(text, 250, 265);
    ctx.restore();
}

function easeOut(t, b, c, d) {
    var ts = (t /= d) * t;
    var tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

function addressMsg() {
	ctx.beginPath();
	ctx.fillStyle = "black";
	ctx.font = fontTypeA;
	ctx.textAlign = "end";
	ctx.fillText(addressMsgStr, 490, 490);
	ctx.closePath();
}

document.addEventListener('DOMContentLoaded', function () {
    drawRouletteWheel();
    spinMsg();
    document.getElementById('canvasDiv').onclick = spin;
}, false);