var gColorRed = "#CF0F0F"
var gColorYellow = "#fcc21b"
var gColorDarkYellow = "#f0a20b"
var gColorBrown = "#463502";
var gColorTear = '#77CCEE';

var gEmojiCenterX = 300;
var gEmojiCenterY = 150;
var gEmojiR = 125;

var gEmojiEyeHeight = 20;
var gEmojiEyeWidth = gEmojiEyeHeight * 2 / 3;

var gLineWidth = 7;

function draw_emoji(id, joy, sad, angry) 
{
	sad = Math.min(sad, 75);

	var c=document.getElementById(id);
	var ctx=c.getContext("2d");
	ctx.beginPath();

	if (angry > 75)
	{
		ctx.fillStyle = gColorRed;
	}
	else 
	{
		ctx.fillStyle = gColorYellow;
	}

	ctx.arc(gEmojiCenterX, gEmojiCenterY, gEmojiR, 0, 2*Math.PI);
	ctx.fill();

	ctx.fillStyle = gColorBrown;
	draw_eyes(ctx);
	draw_eyebrows(ctx, angry);
	if (angry > 0) {
		draw_angry_lip(ctx, angry);
	}
	else 
	{
		lips(ctx, sad, joy);
	}


	if (joy >= 75)
	{ 
//		lips(ctx, sad, joy / 4);
	}

	if (sad >= 75)
	{
		draw_tear(ctx);
	}
}

function draw_eyes(ctx)
{
	var height = 20;	
	var width = height * 2 / 3;

	var left_x = gEmojiCenterX - gEmojiR * 2 / 5;
	var right_x = gEmojiCenterX + gEmojiR * 2 / 5;

	var y = gEmojiCenterY - gEmojiR / 10;

	ctx.save();
	ellipse(ctx, left_x, y, gEmojiEyeWidth, gEmojiEyeHeight);
	ellipse(ctx, right_x, y, gEmojiEyeWidth, gEmojiEyeHeight);
	ctx.restore();
}

function draw_tear(ctx)
{
	var x = gEmojiCenterX - gEmojiR * 2 / 5 - gEmojiEyeWidth;
	var y = gEmojiCenterY;
	var height = gEmojiEyeHeight * 2;

	var arc = gEmojiR / 7;

	ctx.beginPath();
  ctx.lineJoin = 'miter';
  ctx.moveTo(x, y);

    // ctx.quadraticCurveTo(117.5, 30, 148, 68);

  ctx.arc(x, y + height, arc, 5.75, 3.66, false);

    // ctx.quadraticCurveTo(117.5, 35, 120, 20);

  ctx.closePath();
  ctx.lineWidth = 0;
  ctx.fillStyle = gColorTear;
  ctx.fill();
}

function draw_eyebrows(ctx, up)
{
	if (up > 10) {
		var upOffset = gEmojiR * up / 5 / 100;

		var startX1 = gEmojiCenterX - gEmojiR / 5;
		var startY1 = gEmojiCenterY - gEmojiR / 3;

		var endX1 = startX1 - gEmojiR * 2 / 5;
		var endY1 = gEmojiCenterY - gEmojiR / 3 - upOffset;

		var startX2 = gEmojiCenterX + gEmojiR / 5;
		var startY2 = gEmojiCenterY - gEmojiR / 3;

		var endX2 = startX2 + gEmojiR * 2 / 5;
		var endY2 = endY1;

		ctx.save();
		ctx.beginPath();
		ctx.lineCap = 'round';
		ctx.lineWidth = gLineWidth;
		ctx.strokeStyle = gColorBrown;
		ctx.moveTo(startX1, startY1);
		ctx.lineTo(endX1, endY1);
		ctx.stroke();
		ctx.closePath();

		ctx.beginPath();
		ctx.lineWidth = gLineWidth;
		ctx.strokeStyle = gColorBrown;
		ctx.moveTo(startX2, startY2);
		ctx.lineTo(endX2, endY2);
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
}

function draw_angry_lip(ctx, angry)
{
	ctx.save();
	ctx.beginPath();

	var xOffset = (100 - angry) * gEmojiR * 3 / 5 / 100;
	var yOffset = 0;

	xOffset = Math.max(xOffset, gEmojiR / 5); 

	var startX = gEmojiCenterX - xOffset;
	var startY = gEmojiCenterY + gEmojiR * 2 / 5;

	var endX = gEmojiCenterX + xOffset;
	var endY = startY;

	var arcX = gEmojiCenterX;
	var arcY = gEmojiCenterY;

	console.log("start: ", startX, startY);
	console.log("end:   ", endX, endY);	
	console.log("arc: ", arcX, arcY);

	console.log("xOffset: ", xOffset);
	console.log("yOffset: ", yOffset);

	ctx.moveTo(startX, startY);
	ctx.lineWidth = gLineWidth;
	ctx.lineCap = 'round';
	ctx.strokeStyle = gColorBrown;

  ctx.quadraticCurveTo(arcX, arcY, endX, endY);

  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}



function lips(ctx, down, up)
{
	ctx.save();
	ctx.beginPath();

	var downOffset = (down * gEmojiR + 0.0) / 3 / 100;
	var upOffset = (up * gEmojiR + 0.0) / 2 / 100;

	var startX = gEmojiCenterX - gEmojiR * 3 / 5;
	var startY = gEmojiCenterY + gEmojiR * 2 / 5 + downOffset;

	var endX = gEmojiCenterX + gEmojiR * 3 / 5;
	var endY = startY;

	var arcX1 = startX + gEmojiR / 5;
	var arcY1 = gEmojiCenterY + gEmojiR * 2 / 5 + upOffset;

	var arcX2 = endX - gEmojiR / 5;
	var arcY2 = arcY1;

	console.log("start: ", startX, startY);
	console.log("end:   ", endX, endY);	
	console.log("arc1: ", arcX1, arcY1);
	console.log("arc2: ", arcX2, arcY2);	

	console.log("downOffset: ", downOffset);
	console.log("upOffset: ", upOffset);
	console.log("up: ", up);

	ctx.moveTo(startX, startY);
	ctx.lineWidth = gLineWidth;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	ctx.strokeStyle = gColorBrown;

  ctx.bezierCurveTo(arcX1, arcY1, arcX2, arcY2, endX, endY);
  if (up > 75)
  {
  	ctx.lineTo(startX, startY);
 		ctx.fillStyle = gColorDarkYellow;
  	ctx.fill();
  }

  ctx.stroke();
  ctx.closePath();

  ctx.restore();
}

function ellipse(context, cx, cy, rx, ry)
{
        context.save(); // save state
        context.strokeStyle = null;
        context.beginPath();
        context.translate(cx-rx, cy-ry);
        context.scale(rx, ry);
        context.arc(1, 1, 1, 0, 2 * Math.PI, false);
        context.fill();  
        context.closePath();      
        context.restore(); // restore to original state

      }		